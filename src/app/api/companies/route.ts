import { NextRequest } from "next/server";
import { createCompanyPayloadSchema } from "@/features/companies/schema";
import { createCompany } from "@/features/companies/services/Companies/createCompany";
import { getAllCompanies } from "@/features/companies/services/Companies/getAllCompanies";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";
import { tryCatch, validateZodSchema } from "@/lib/utils";

export async function GET() {
  // prettier-ignore
  const session = await isAuthenticated();

  if (!session && false /*FOR TESTING*/) {
    return handleErrorResponse({
      statusCode: 401,
      message: "You have no access to companies, please log",
    });
  }

  // const hasPermission = await checkServerRoles({
  //   userId: session.user.id,
  //   permissions: { company: ["read"] },
  // });

  // if (!hasPermission && false /*FOR TESTING*/) {
  //   return handleErrorResponse({
  //     statusCode: 403,
  //     message: "Forbidden: You don't have permission to view companies",
  //   });
  // }

  const companies = await getAllCompanies();

  return handleSuccessResponse({
    statusCode: 200,
    data: companies,
    message: "Company created successfully",
  });
}

export async function POST(req: NextRequest) {
  const session = await isAuthenticated();

  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });

  // const hasPermission = await checkServerRoles({
  //   userId: session?.user?.id, // FOR TESTING
  //   permissions: { company: ["create"] },
  // });

  // if (!hasPermission && false /*FOR TESTING*/)
  //   return handleErrorResponse({
  //     statusCode: 403,
  //     message: "Forbidden: You don't have permission to create companies",
  //   });

  const { data: body } = await tryCatch(req.json());

  const validatedBody = validateZodSchema(body, createCompanyPayloadSchema);

  // prettier-ignore
  if (validatedBody instanceof Response) 
      return validatedBody;

  const { error, data: newCompany } = await tryCatch(
    createCompany(validatedBody),
  );

  if (error)
    return handleErrorResponse({
      statusCode: 400,
      message: "Failed to create company",
    });

  return handleSuccessResponse({
    statusCode: 201,
    data: newCompany,
    message: "Company created successfully",
  });
}
