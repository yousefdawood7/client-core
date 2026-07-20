import z from "zod";

export const createCompanySchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  salesManager: z.string().min(1, "Sales Manager is required"),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
