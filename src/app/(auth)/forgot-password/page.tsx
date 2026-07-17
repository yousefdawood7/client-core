"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import ForgotPasswordEmailForm from "@/features/auth/components/forgot-password-email-form";
import ForgotPasswordOtpForm from "@/features/auth/components/forgot-password-otp-form";
import ForgotPasswordSuccess from "@/features/auth/components/forgot-password-success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-500">
      {/* Top Branding Section */}
      <div className="flex flex-col items-center gap-2 mb-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Building2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Client Core
        </h1>
        <p className="text-sm text-muted-foreground">Authentication portal</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300">
        {step === "email" && (
          <ForgotPasswordEmailForm
            onSuccess={(email) => {
              setEmail(email);
              setStep("otp");
            }}
          />
        )}

        {step === "otp" && (
          <ForgotPasswordOtpForm
            email={email}
            onSuccess={() => setStep("success")}
            onBack={() => setStep("email")}
          />
        )}

        {step === "success" && <ForgotPasswordSuccess />}

        {/* Back to Sign In Link */}
        {step !== "success" && (
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
