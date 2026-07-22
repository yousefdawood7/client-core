import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { handleErrorResponse } from "@/lib/better-auth/handleResponse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const handleZodErrors = function (zodError: z.ZodError) {
  const errorObjects: Record<string, string | string[]> = {};

  const fieldErrorsObject = z.flattenError(zodError).fieldErrors as {
    [key: string]: string[];
  };

  for (const key in fieldErrorsObject) {
    errorObjects[key] =
      fieldErrorsObject[key]!.length > 1
        ? fieldErrorsObject[key]!
        : fieldErrorsObject[key]![0]!;
  }

  return { fieldErrors: errorObjects };
};

export function validateZodSchema<TSchema extends z.ZodType>(
  value: Record<string, unknown>,
  schema: TSchema,
) {
  const { error, data } = schema.safeParse(value);

  if (error)
    return handleErrorResponse({
      statusCode: 400,
      message: "Please provide valid data",
      details: handleZodErrors(error),
    });

  return data;
}

// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
