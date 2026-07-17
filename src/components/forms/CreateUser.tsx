"use client";
import { SubmitHandler,useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";

export default function CreateUser() {
  const CreatUserSchema = z
    .object({
      name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" }),
      email: z.email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type UserTypes = z.infer<typeof CreatUserSchema>;

  const Defult_Values: UserTypes = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserTypes>({
    resolver: zodResolver(CreatUserSchema),
    values: Defult_Values,
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<UserTypes> = (data) => {
    console.log(data);
    console.log(errors);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <FieldSet>
        <FieldGroup className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field data-invalid={!!errors.name}>
              <FieldLabel
                className="label mb-2 text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Full Name
              </FieldLabel>
              <Input
                id="name"
                placeholder="Inter Your Full Name"
                {...register("name")}
                className="h-12 rounded-xl border-gray-300 bg-white focus-visible:border-blue-500 focus-visible:ring-blue-500"
              />
              {errors.name && (
                <FieldError errors={[errors.name]} />
              )}
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel
                className="label mb-2 text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </FieldLabel>
              <Input
                type="email"
                id="email"
                placeholder="Inter Your Email Address"
                {...register("email")}
                className="h-12 rounded-xl border-gray-300 bg-white focus-visible:border-blue-500 focus-visible:ring-blue-500"
              />
              {errors.email && <FieldError  errors={[errors.email]} />}
            </Field>
          </div>
          <Field data-invalid={!!errors.password}>
            <FieldLabel
              className="label mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </FieldLabel>
            <Input
              type="password"
              id="password"
              placeholder="Inter Your Password"
              {...register("password")}
              className="h-12 rounded-xl border-gray-300 bg-white focus-visible:border-blue-500 focus-visible:ring-blue-500"
            />
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>
          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel
              className="label mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Confirm Password
            </FieldLabel>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Your Password"
              {...register("confirmPassword")}
              className="h-12 rounded-xl border-gray-300 bg-white focus-visible:border-blue-500 focus-visible:ring-blue-500"
            />
            {errors.confirmPassword && <FieldError errors={[errors.confirmPassword]} />}
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="mt-8 flex gap-4">
        <Button
          variant="default"
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl text-white bg-blue-600 px-6 hover:bg-blue-700"
        >
          Create User
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl px-6 border-gray-300"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
