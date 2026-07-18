import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { admin, emailOTP } from "better-auth/plugins";
import AuthEmail from "@/features/auth/components/email-templates";
import { resend } from "@/lib/resend";

import { env } from "./env";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        void resend.emails.send({
          from: env.EMAIL_FROM,
          to: user.email,
          subject: "Change Email Confirmation",
          react: AuthEmail({
            url,
            type: "change-email",
            newEmail,
          }),
        });
      },
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: env.EMAIL_FROM,
        to: user.email,
        subject: "Verify your email address",
        react: AuthEmail({
          url,
          type: "email-verification",
        }),
      });
    },
  },

  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[DEV-ONLY] OTP Code for ${email} (${type}): ${otp}`);
        }

        void resend.emails.send({
          from: env.EMAIL_FROM,
          to: email,
          subject:
            type === "forget-password" ? "Reset your password" : "OTP Code",
          react: AuthEmail({
            otp,
            type,
          }),
        });
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
