import * as z from "zod";

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

export type LoginSchema = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;


export const resetPasswordSchema = z.object({
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;


