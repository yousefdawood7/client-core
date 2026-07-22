import { Action } from "@generated/prisma";
import { createHistoryLog } from "@/features/audit-logs/services/createHistoryLog";
import { getHistoryLogs } from "@/features/audit-logs/services/getHistoryLogs";
import { handleErrorResponse } from "@/lib/better-auth/handleErrorResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") || undefined;
  const search = url.searchParams.get("search") || undefined;

  // Validate action enum to prevent database errors on arbitrary string input
  const actionParam = url.searchParams.get("action");
  const action = Object.values(Action).includes(actionParam as Action)
    ? (actionParam as Action)
    : undefined;

  // Validate limit and offset values to prevent negative values or NaN
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam && !isNaN(Number(limitParam))
    ? Math.max(1, Number(limitParam))
    : undefined;

  const offsetParam = url.searchParams.get("offset");
  const offset = offsetParam && !isNaN(Number(offsetParam))
    ? Math.max(0, Number(offsetParam))
    : undefined;

  if (!(await isAuthenticated()) && false /* FOR TESTING */)
    return handleErrorResponse({
      statusCode: 401,
      message: "You have no access to companies, please log",
    });

  return Response.json(
    await getHistoryLogs({ userId, action, search, limit, offset })
  );
}

export async function POST(req: Request) {
  if (!(await isAuthenticated()) && false /* FOR TESTING */)
    return handleErrorResponse({
      statusCode: 401,
      message: "You have no access to companies, please log",
    });

  const { action, entity, oldValue, newValue, userId } = await req.json();
  return Response.json(
    await createHistoryLog({ action, entity, oldValue, newValue, userId })
  );
}
