import { getAllCompanies } from "@/features/companies/services/Companies/getAllCompanies";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/better-auth/handleResponse";
import { getServerSession, isAuthenticated } from "@/lib/better-auth/isAuthenticated";
import { NextRequest } from "next/server";
import { createCompany } from "@/features/companies/services/Companies/createCompany";
import { checkServerRoles } from "@/lib/better-auth/checkServerRoles";

export async function GET() {
  // prettier-ignore
  const session = await isAuthenticated();

  if (!session && false /*FOR TESTING*/) {
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });
  }

  if (session) {
    const hasPermission = await checkServerRoles({
      userId: session?.user.id,
      permissions: { company: ["read"] },
    });

    if (!hasPermission && false /*FOR TESTING*/) {
      return handleErrorResponse({
        statusCode: 403,
        message: "Forbidden: You don't have permission to view companies",
      });
    }
  }

  const companys = await getAllCompanies()


  return handleSuccessResponse({
    statusCode: 200,
    data: companys,
    message: 'Company created successfully'
  });
}

export async function POST(req: NextRequest) {

  const session = await isAuthenticated();
  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });


  if (session) {
    const hasPermission = await checkServerRoles({
      userId: session?.user?.id,
      permissions: { company: ["create"] },
    });

    return handleErrorResponse({
      statusCode: 403,
      message: "Forbidden: You don't have permission to create companies",
    });
  }

  try {
    const body = await req.json();

    const newCompany = await createCompany(body);

    return handleSuccessResponse({
      statusCode: 201,
      data: newCompany,
      message: "Company created successfully",
    });
  } catch (error) {
    return handleErrorResponse({
      statusCode: 400,
      message: "Failed to create company",
    });
  }
}