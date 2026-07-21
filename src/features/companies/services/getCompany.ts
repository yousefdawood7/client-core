import { prisma } from "@/lib/prisma";

export async function getCompany(id: string) {
  const company = await prisma.company.findUnique({
    where: {
      id,
    },

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
  });
  return (
    company && {
      id: company.id,
      name: company.name,
      url: company.url,
      createdAt: company.createdAt,
      numberOfLeads: company._count.leads,
      user: company.users[0].user.name,
    }
  );
}
