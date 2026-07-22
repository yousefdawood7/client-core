import { Action } from "@generated/prisma";
import z from "zod";

export const getQuerySchema = z.object({
  userId: z
    .string()
    .nullish()
    .transform((val) => val || undefined),
  search: z
    .string()
    .nullish()
    .transform((val) => val || undefined),
  action: z
    .enum(Action)
    .nullish()
    .catch(undefined)
    .transform((val) => val || undefined),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .nullish()
    .catch(undefined)
    .transform((val) => val ?? undefined),
  offset: z.coerce
    .number()
    .int()
    .min(0)
    .nullish()
    .catch(undefined)
    .transform((val) => val ?? undefined),
});

export const postBodySchema = z.object({
  action: z.enum(Action),
  entity: z.string().min(1),
  oldValue: z
    .string()
    .nullish()
    .transform((val) => val || undefined),
  newValue: z.string().min(1),
});