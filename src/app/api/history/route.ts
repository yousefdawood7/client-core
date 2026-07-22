import { createHistoryLog } from "@/features/audit-logs/services/createHistoryLog";
import { getHistoryLogs } from "@/features/audit-logs/services/getHistoryLogs";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";
import { tryCatch, validateZodSchema } from "@/lib/utils";

import { getQuerySchema, postBodySchema } from "./schemas";

export async function GET(req: Request) {
   const url = new URL(req.url);
  const result = getQuerySchema.safeParse(Object.fromEntries(url.searchParams.entries()));

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

  const { data: body } = await tryCatch(req.json());

  const result = validateZodSchema(body, postBodySchema);

  if (result instanceof Response) {
    return result;
  }

  const { action, entity, oldValue, newValue } = result;

  const { data: historyLog, error } = await tryCatch(
    createHistoryLog({
      action,
      entity,
      oldValue,
      newValue,
    }),
  );

  if (error) {
    return handleErrorResponse({
      statusCode: 400,
      message: (error as Error).message || "Failed to create history log",
    });
  }

  return handleSuccessResponse({
    statusCode: 201,
    message: "History log created successfully",
    data: historyLog as unknown as Record<string, unknown>,
  });
}
