"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";

import {
  createUserSchema,
  createUserDefaultValues,
  type CreateUserSchema,
} from "../features/profile/schemas";
import FormField from "./ui/form-field";

export default function CreateUserForm() {
  const methods = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: createUserDefaultValues,
    mode: "onTouched",
  });

async function session() {
  const session = await authClient.getSession();
  return console.log(session);
} 

session();

  const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
    const { data: newUser, error } = await authClient.admin.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log(newUser);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
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

            <FormField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Your Password"
            />
          </FieldGroup>
        </FieldSet>

        <div className="mt-8 flex gap-4">
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="h-11 rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            {methods.formState.isSubmitting ? "Creating..." : "Create User"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl border-gray-300 px-6"
            onClick={() => methods.reset()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}