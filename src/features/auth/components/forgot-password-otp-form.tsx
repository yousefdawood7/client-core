"use client";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/form-field";
import OtpField from "@/features/auth/components/otp-field";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/features/auth/schemas";
import { authClient } from "@/lib/better-auth/auth-client";
import { Spinner } from "@/components/ui/spinner";

type ForgotPasswordOtpFormProps = {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
};

export default function ForgotPasswordOtpForm({
  email,
  onSuccess,
  onBack,
}: ForgotPasswordOtpFormProps) {
  const [otp, setOtp] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    setSubmitError(null);
    if (otp.length !== 6) {
      setSubmitError("Please enter a valid 6-digit OTP code.");
      return;
    }
    try {
      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password: data.password,
      });
      if (error) {
        setSubmitError(error.message || "Failed to reset password.");
        return;
      }
      onSuccess();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setSubmitError(message);
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1 mb-2">
          <h2 className="text-lg font-semibold text-foreground">Verify OTP</h2>
          <p className="text-xs text-muted-foreground">
            Enter the 6-digit code sent to{" "}
            <strong className="text-foreground">{email}</strong> and your new
            password.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-foreground">
            OTP Code
          </Label>
          <OtpField
            value={otp}
            setValue={setOtp}
            isPending={form.formState.isSubmitting}
          />
        </div>

        <FormField
          label="New Password"
          name="password"
          type="password"
          placeholder="••••••••"
        />

        {submitError && (
          <div className="text-xs font-semibold text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 text-center animate-in fade-in slide-in-from-top-1">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={
            form.formState.isSubmitting ||
            otp.length !== 6 ||
            !form.formState.isValid
          }
          className="w-full font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] shadow-sm transition-all focus-visible:ring-2 active:scale-[0.98]"
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner />
              Reset Password
            </>
          ) : (
            "Reset password"
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="w-full h-10 text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
        >
          Change email address
        </Button>
      </form>
    </FormProvider>
  );
}
