import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { admin, emailOTP } from "better-auth/plugins";
import OtpEmail from "@/features/auth/components/email-templates";
import { resend } from "@/lib/resend";

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
        if (process.env.NODE_ENV !== "production") {
          console.log(`🔑 [DEV-ONLY] OTP Code for ${email} (${type}): ${otp}`);
        }

        try {
          const { data, error } = await resend.emails.send({
            from: env.EMAIL_FROM,
            to: email,
            subject:
              type === "forget-password" ? "Reset your password" : "OTP Code",
            react: OtpEmail({
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
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
});
