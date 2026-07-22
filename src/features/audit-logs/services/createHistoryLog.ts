"use server";
import { headers } from "next/headers";
import { Action } from "@generated/prisma";
import { prisma } from "@lib/prisma";
import { auth } from "@/lib/better-auth/auth";

interface CreateHistoryLogInput {
  action: Action;
  entity: string;
  oldValue?: string | null;
  newValue: string;
}

export async function createHistoryLog({
  action,
  entity,
  oldValue,
  newValue,
}: CreateHistoryLogInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("You must be logged in to perform this action.");
  }

  return await prisma.history.create({
    data: {
      action,
      entity,
      oldValue: oldValue || null,
      newValue,
      userId: session.user.id,
    },
  });
}



