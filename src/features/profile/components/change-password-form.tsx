"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { changePasswordSchema, ChangePasswordSchema } from "../schemas";
import { changePassword } from "../actions";

export default function ChangePasswordForm() {

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    try {
      const result = await changePassword(data);
      if (result.success) {
        toast.success("Password updated successfully!");
        form.reset();
      } else {
        toast.error("Failed to update password.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Lock className="h-4 w-4 text-muted-foreground" />
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                label="Current Password"
                required
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="New Password"
                  required
                  name="newPassword"
                  type="password"
                  placeholder="Min. 8 characters"
                />

                <FormField
                  label="Confirm Password"
                  required
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat new password"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || !form.formState.isValid}
                className="font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center gap-2 h-10 px-4 active:scale-[0.98] transition-all"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
