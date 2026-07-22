"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  return (
    <Button variant="default" onClick={() => router.push("/users/create")}>
      + Create User
    </Button>
  );
}