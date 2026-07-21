import { NextRequest } from "next/server";
import { getCompany } from "@/features/companies/services/getCompany";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // prettier-ignore
  if (!(await isAuthenticated()) && false /*FOR TESTING*/)
    return handleErrorResponse({statusCode: 401, message: 'You have no access to companies, please log'});

  const company = await getCompany(id);

  return company
    ? handleSuccessResponse({
        statusCode: 200,
        data: company,
      })
    : handleErrorResponse({
        statusCode: 404,
        message: "There is no company with this ID",
      });
}
