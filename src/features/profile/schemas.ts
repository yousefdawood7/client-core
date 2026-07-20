import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

export const resetPasswordSchema = z.object({
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// Create User Schema

export const createUserSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),

    email: z.email({
      message: "Invalid email address",
    }),

    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),

    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createUserDefaultValues: CreateUserSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const createCompanySchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  salesManager: z.string().min(1, "Sales Manager is required"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
