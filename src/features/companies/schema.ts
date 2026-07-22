import z from "zod";

export const createCompanySchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  salesManager: z.string().min(1, "Sales Manager is required"),
});

export const createCompanyPayloadSchema = z.object({
  name: z.string("Company Name is required").min(1, "Company Name is required"),
  url: z.url("You must provide valid URL").optional(),
});

export const updateCompanySchema = createCompanyPayloadSchema.partial();

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
export type CreateCompanyPayloadSchema = z.infer<
  typeof createCompanyPayloadSchema
>;
export type UpdateCompanySchema = z.infer<typeof updateCompanySchema>;
