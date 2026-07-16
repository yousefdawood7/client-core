"use client";

import { authClient } from "@/lib/auth-client";

import { LoginSchema } from "./types";

export async function signIn({ email, password }: LoginSchema) {
  const { data, error } = await authClient.signIn.email(
    {
      email,
      password,
      callbackURL: "/dashboard",
      rememberMe: true,
    },
    {
      onError: ({ error }) => {
        throw new Error(error.message);
      },
    },
  );

  return { data, error };
}
