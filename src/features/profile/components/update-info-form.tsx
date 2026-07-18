"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { useRouter } from "next/navigation";
import { updateProfileSchema, UpdateProfileSchema } from "../schemas";
import { updateProfile } from "../actions";

export default function UpdateInfoForm({
  name,
  email,
}: {
  name?: string | null;
  email?: string | null;
}) {
  const router = useRouter();

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileSchema> = async (data) => {
    try {
      const result = await updateProfile(data);
      if (result.success) {
        form.reset(data);
        router.refresh();
        if (result.emailVerificationSent) {
          toast.success("Profile updated! Please verify the new email address via the link sent to it.");
        } else {
          toast.success("Profile details updated successfully!");
        }
      } else {
        toast.error("Failed to update profile details.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-foreground">Update Information</h3>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              required
              name="name"
              placeholder="Your name"
            />

            <FormField
              label="Email"
              required
              name="email"
              type="email"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting || !form.formState.isValid || !form.formState.isDirty
              }
              className="font-semibold cursor-pointer rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex items-center gap-2 h-10 px-4 active:scale-[0.98] transition-all"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
