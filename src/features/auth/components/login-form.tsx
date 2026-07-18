"use client";
import { useState } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuickProfile } from "@/lib/types";

import { QUICK_PROFILES } from "../constants";
import { LoginSchema, loginSchema } from "../schemas";
import { signIn } from "../sign-in";
import FormField from "@/components/ui/form-field";

function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleQuickLogin = (profile: QuickProfile) => {
    setSubmitError(null);
    setSelectedProfileId(profile.id);
    form.setValue("email", profile.email, { shouldValidate: true });
    form.setValue("password", profile.password, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setSubmitError(null);
    try {
      const res = await signIn(data);
      if (res?.error) {
        setSubmitError(res.error.message || "Invalid credentials");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setSubmitError(message);
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email field */}
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="you@company.com"
          />

          {/* Password field */}
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <Controller
                name="rememberMe"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id="remember-me"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={field.disabled}
                  />
                )}
              />
              <label
                htmlFor="remember-me"
                className="font-medium text-foreground cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="font-semibold text-primary hover:text-primary/95 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="text-xs font-semibold text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 text-center">
              {submitError}
            </div>
          )}

          {/* Sign In Button */}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] shadow-sm transition-all focus-visible:ring-2 active:scale-[0.98]"
          >
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        {/* Divider / Quick Login Title */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <span className="relative bg-background px-3 text-[11px] font-bold tracking-wider text-muted-foreground">
            QUICK LOGIN
          </span>
        </div>

        {/* Quick Login Grid */}
        <div className="grid grid-cols-2 gap-3">
          {QUICK_PROFILES.map((profile: QuickProfile) => {
            const isSelected = selectedProfileId === profile.id;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => handleQuickLogin(profile)}
                className={`flex flex-col items-start gap-0.5 rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-sm scale-[1.02]"
                    : "border-border"
                }`}
              >
                <span className="text-[12px] font-bold text-foreground">
                  {profile.name}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground">
                  {profile.role}
                </span>
              </button>
            );
          })}
        </div>
      </FormProvider>
    </>
  );
}

export default LoginForm;
