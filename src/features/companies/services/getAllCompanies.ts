import { prisma } from "@/lib/prisma";

export async function getAllCompanies() {
  const companies = await prisma.company.findMany({
    include: {
      _count: {
        select: {
          leads: true,
        },
      },
    },
  });

  return companies;
}
