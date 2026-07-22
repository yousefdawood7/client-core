"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { authClient } from "@/lib/better-auth/auth-client";

import FormField from "../../../components/ui/form-field";
import SelectField from "../../../components/ui/select-field";
import {
  createUserDefaultValues,
  type CreateUserSchema,
  createUserSchema,
} from "./schemas";

export default function CreateUserForm() {
  const methods = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: createUserDefaultValues,
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
    await authClient.admin.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role:data.role,

      fetchOptions: {
        onSuccess: () => {
          toast.success("User created successfully");
          methods.reset();
        },
        onError: (error) => {
          if (error.error.code === "YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS") {
            toast.error("You are not allowed to create users");
            return;
          }
          toast.error("Failed to create user");
        },
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card text-card-foreground p-8 shadow-sm"
      >
        <FieldSet>
          <FieldGroup className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="name"
                label="Full Name"
                placeholder="Enter Your Full Name"
              />

              <FormField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Your Email"
              />
            </div>

            <FormField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Your Password"
            />

            <SelectField
              name="role"
              label="Role"
              placeholder="Select Role"
              options={[
                { label: "Admin", value: "admin" },
                { label: "Head", value: "head" },
                { label: "Sales", value: "sales" },
              ]}
            />
          </FieldGroup>
        </FieldSet>

        <div className="mt-8 flex gap-4">
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="h-11 rounded-xl bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
          >
            {methods.formState.isSubmitting ? "Creating..." : "Create User"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl border-border text-secondary-foreground px-6 cursor-pointer"
            onClick={() => methods.reset()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
