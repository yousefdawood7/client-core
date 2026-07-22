"use server";
import { Prisma } from "@generated/prisma";
import { Action } from "@generated/prisma";
import { prisma } from "@/lib/prisma";

interface GetHistoryLogsInput {
  userId?: string;
  action?: Action;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getHistoryLogs(options?: GetHistoryLogsInput) {
  const { userId, action, search, limit = 10, offset = 0 } = options || {};

  const whereClause: Prisma.HistoryWhereInput = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (action) {
    whereClause.action = action;
  }

  if (search) {
    whereClause.OR = [
      {
        entity: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        oldValue: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        newValue: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const [total, logs] = await Promise.all([
    prisma.history.count({
      where: whereClause,
    }),
    prisma.history.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
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
    }),
  ]);

  return {
    logs,
    total,
    limit,
    offset,
  };
}
