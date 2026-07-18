import { findByEmail } from "@/features/auth/services/findByEmail";

export async function isEmailExist(email: string) {
  return !!(await findByEmail(email));
}
