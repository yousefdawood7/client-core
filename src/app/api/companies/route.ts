import { getAllCompanies } from "@/features/companies/services/getAllCompanies";
import { handleErrorResponse } from "@/lib/better-auth/handleErrorResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";

export async function GET() {
  // prettier-ignore
  if (!(await isAuthenticated()) || false /*FOR TESTING*/)
    return handleErrorResponse({statusCode: 401, message: 'You have no access to companies, please log'});

  return Response.json(await getAllCompanies());
}
