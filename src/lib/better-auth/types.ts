import { Permissions } from "@/lib/better-auth/permissions";

export type CheckRolesType = {
  userId: string;
  permissions: Permissions;
};
