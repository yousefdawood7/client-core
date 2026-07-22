import { createHistoryLog } from "@/features/audit-logs/services/createHistoryLog";
import { getHistoryLogs } from "@/features/audit-logs/services/getHistoryLogs";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";

import { getQuerySchema, postBodySchema } from "./schemas";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const result = getQuerySchema.safeParse({
    userId: url.searchParams.get("userId"),
    search: url.searchParams.get("search"),
    action: url.searchParams.get("action"),
    limit: url.searchParams.get("limit"),
    offset: url.searchParams.get("offset"),
  });

  if (!result.success) {
    return handleErrorResponse({
      statusCode: 400,
      message: "Invalid query parameters",
    });
  }

  const { userId, search, action, limit, offset } = result.data;

  if (!(await isAuthenticated()) && false /* FOR TESTING */)
    return handleErrorResponse({
      statusCode: 401,
      message: "You have no access to companies, please log",
    });

  const historyLogs = await getHistoryLogs({
    userId,
    action,
    search,
    limit,
    offset,
  });

  return handleSuccessResponse({
    statusCode: 200,
    data: historyLogs,
  });
}

export async function POST(req: Request) {
  if (!(await isAuthenticated()) && false /* FOR TESTING */)
    return handleErrorResponse({
      statusCode: 401,
      message: "You have no access to companies, please log",
    });

  try {
    const body = await req.json();
    const result = postBodySchema.safeParse(body);

    if (!result.success) {
      return handleErrorResponse({
        statusCode: 400,
        message: "Invalid history log payload",
      });
    }

    const { action, entity, oldValue, newValue } = result.data;

    const historyLog = await createHistoryLog({
      action,
      entity,
      oldValue,
      newValue,
    });

    return handleSuccessResponse({
      statusCode: 201,
      message: "History log created successfully",
      data: historyLog as unknown as Record<string, unknown>,
    });
  } catch (e) {
    return handleErrorResponse({
      statusCode: 400,
      message: (e as Error).message,
    });
  }
}
