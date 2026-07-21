import { prisma } from "@/lib/prisma";

export async function getAllCompanies() {
  const companies = (
    await prisma.company.findMany({
      omit: {
        userId: true,
        updatedAt: true,
      },

      include: {
        users: {
          where: {
            user: {
              role: "sales",
            },
          },
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },

        _count: {
          select: {
            leads: true,
          },
        },
      },
    })
  ).map(({ users, _count, ...company }) => ({
    ...company,
    numberOfLeads: _count.leads,
    salesManager: users[0].user.name,
  }));

  return companies;
}
