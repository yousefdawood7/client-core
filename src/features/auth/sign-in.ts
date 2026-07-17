"use client";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import { LoginSchema } from "./schemas";

export async function signIn({ email, password, rememberMe }: LoginSchema) {
  return await authClient.signIn.email({
    email,
    password,
    callbackURL: "/dashboard",
    rememberMe,
    fetchOptions: {
      onSuccess: () => {
        toast.success("Signed in successfully");
      },
    },
  });
}
