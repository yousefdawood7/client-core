import { Building2 } from "lucide-react";
import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Top Branding Section */}
      <div className="flex flex-col items-center gap-2 mb-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Building2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Client Core
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your workspace
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-background p-6 shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
}
