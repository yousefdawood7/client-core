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
  userId?: string;
}

export async function createHistoryLog({
  action,
  entity,
  oldValue,
  newValue,
  userId,
}: CreateHistoryLogInput) {
  let finalUserId = userId;

  if (!finalUserId) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("You must be logged in to perform this action.");
    }

    finalUserId = session.user.id;
  }

  return await prisma.history.create({
    data: {
      action,
      entity,
      oldValue: oldValue || null,
      newValue,
      userId: finalUserId,
    },
  });
}


