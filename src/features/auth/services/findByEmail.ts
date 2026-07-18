import { prisma } from "@/lib/prisma";

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
