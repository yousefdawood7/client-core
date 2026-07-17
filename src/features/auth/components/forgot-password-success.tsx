"use client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordSuccess() {
  return (
    <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          Password Reset Successfully
        </h2>
        <p className="text-xs text-muted-foreground">
          Your password has been successfully reset. You can now sign in
          with your new password.
        </p>
      </div>
      <Link href="/login" className="block w-full">
        <Button
          size="lg"
          className="w-full font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] shadow-sm transition-all focus-visible:ring-2 active:scale-[0.98]"
        >
          Go to Sign In
        </Button>
      </Link>
    </div>
  );
}
