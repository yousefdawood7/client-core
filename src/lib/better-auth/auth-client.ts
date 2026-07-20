import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/lib/env";

import { ac, admin, head, sales } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: { admin, head, sales },
    }),
    emailOTPClient(),
  ],
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
