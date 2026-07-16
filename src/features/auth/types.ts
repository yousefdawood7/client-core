import * as z from "zod";

export interface QuickProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
}

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
