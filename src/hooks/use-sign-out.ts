"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/auth-client";

export function useSignOut() {
  const router = useRouter();

  const signOut = async () => {
  try {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.replace("/login");
  } catch {
    toast.error("Failed to logout");
  }
};

  return signOut;
}
