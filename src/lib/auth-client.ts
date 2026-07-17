import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/lib/env";

export const authClient = createAuthClient({
  plugins: [adminClient(), emailOTPClient()],
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
