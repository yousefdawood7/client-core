import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";

import { nextCookies } from "better-auth/next-js" //
import { admin, emailOTP } from "better-auth/plugins";
import AuthEmail from "@/features/auth/components/email-templates";
import { resend } from "@/lib/resend";

import { env } from "./env";
import { prisma } from "./prisma";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => {
        try {
          const { data, error } = await resend.emails.send({
            from: env.EMAIL_FROM,
            to: user.email,
            subject: "Change Email Confirmation",
            react: AuthEmail({
              url,
              type: "change-email",
              newEmail,
            }),
          });
  
          if (error) {
            console.error("Resend API error:", error);
          } else {
            console.log("Resend email sent successfully:", data);
          }
        } catch (e) {
          console.error("Failed to send OTP via Resend:", e);
        }
      }
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const { data, error } = await resend.emails.send({
          from: env.EMAIL_FROM,
          to: user.email,
          subject: "Verify your email address",
          react: AuthEmail({
            url,
            type: "email-verification",
          }),
        });

        if (error) {
          console.error("Resend API error:", error);
        } else {
          console.log("Resend email sent successfully:", data);
        }
      } catch (e) {
        console.error("Failed to send verification email via Resend:", e);
      }
    },
  },

  plugins: [
    admin(),
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[DEV-ONLY] OTP Code for ${email} (${type}): ${otp}`);
        }

        try {
          const { data, error } = await resend.emails.send({
            from: env.EMAIL_FROM,
            to: email,
            subject:
              type === "forget-password" ? "Reset your password" : "OTP Code",
            react: AuthEmail({
              otp,
              type,
            }),
          });

          if (error) {
            console.error("Resend API error:", error);
          } else {
            console.log("Resend email sent successfully:", data);
          }
        } catch (e) {
          console.error("Failed to send OTP via Resend:", e);
        }
      },
    }),
    nextCookies(),
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
});
