export const companyPipeline = {
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
};
