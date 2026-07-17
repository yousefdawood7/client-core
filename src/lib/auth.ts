import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

import { generateOtpEmailHtml } from "./email-templates";
import { env } from "./env";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Log to console for easy testing in development
        console.log(`🔑 [DEV-ONLY] OTP Code for ${email} (${type}): ${otp}`);

        if (env.RESEND_API_KEY) {
          try {
            const resend = new Resend(env.RESEND_API_KEY);
            const toEmail = email;
            const fromEmail = env.EMAIL_FROM || "onboarding@resend.dev";

            const { data, error } = await resend.emails.send({
              from: fromEmail,
              to: [toEmail],
              subject:
                type === "forget-password" ? "Reset your password" : "OTP Code",
              html: generateOtpEmailHtml(otp, type),
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
    }),
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
});
