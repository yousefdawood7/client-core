import { ChangePasswordSchema, UpdateProfileSchema } from "./schemas";
import { authClient } from "@/lib/better-auth/auth-client";

export async function updateProfile(data: UpdateProfileSchema) {
  const { data: session } = await authClient.getSession();
  const currentEmail = session?.user?.email;
  const currentName = session?.user?.name;

  let nameUpdated = false;
  let emailVerificationSent = false;

  if (data.name !== currentName) {
    const { error } = await authClient.updateUser({
      name: data.name,
    });
    if (error) {
      return { success: false, error };
    }
    nameUpdated = true;
  }

  if (data.email !== currentEmail) {
    const { error } = await authClient.changeEmail({
      newEmail: data.email,
      callbackURL: "/profile",
    });
    if (error) {
      return { success: false, error };
    }
    emailVerificationSent = true;
  }

  return { success: true, nameUpdated, emailVerificationSent };
}

export async function changePassword(data: ChangePasswordSchema) {
  const { error } = await authClient.changePassword({
    newPassword: data.newPassword,
    currentPassword: data.currentPassword,
    revokeOtherSessions: true,
  });
  if (error) {
    return { success: false, error };
  }
  return { success: true };
}
