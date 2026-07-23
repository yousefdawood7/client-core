import { authClient } from "@/lib/better-auth/auth-client";
import { CheckRolesType } from "@/lib/better-auth/types";

export async function checkClientRoles({
  userId,
  permissions,
}: CheckRolesType) {
  const { data } = await authClient.admin.hasPermission({
    userId,
    permissions,
  });

  return data?.success; //! will be undefined if it's still loading
}
