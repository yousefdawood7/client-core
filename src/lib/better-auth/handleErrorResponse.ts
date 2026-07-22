type HandleErrorResponse = {
  statusCode: number;
  message: string;
  details?: Record<string, unknown>;
};

export function handleErrorResponse({
  statusCode,
  message,
  details,
}: HandleErrorResponse) {
  return Response.json(
    {
      statusCode,
      message,
      status: statusCode < 500 ? "fail" : "error",
      ...(details && {}),
    },
    { status: statusCode },
  );
}