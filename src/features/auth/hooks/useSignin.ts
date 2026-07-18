import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import { LoginSchema } from "../schemas";
import { useRouter } from "next/navigation";

export function useSignin() {
  const router = useRouter();

  return async ({ email, password, rememberMe }: LoginSchema) =>
    authClient.signIn.email({
      email,
      password,
      rememberMe,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed in successfully");
          router.replace("/dashboard");
        },
      },
    });
}
