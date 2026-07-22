
export const historyPipeline = {
  orderBy: {
    createdAt: "desc",
  },
  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    },
  },
} as const