import * as z from "zod";

// Create User Schema

export const createUserSchema = z
  .object({
    name: z
      .string("Name is Required")
      .min(3, { message: "Name must be at least 3 characters" }),

    email: z
    .string("Email is required")
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),

    password: z
      .string("password is required")
      .min(8, {
        message: "Password must be at least 8 characters",
      }),

    role: z.enum(["admin" , "head" , "sales"] )
  })


export const createUserDefaultValues: CreateUserSchema = {
  name: "",
  email: "",
  password: "",
  role:"admin"
};

export type CreateUserSchema = z.infer<typeof createUserSchema>;