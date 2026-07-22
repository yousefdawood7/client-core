import { NextRequest } from "next/server";
import { updateCompanySchema } from "@/features/companies/schema";
import { deleteCompany } from "@/features/companies/services/Companies/deleteCompany";
import { getCompany } from "@/features/companies/services/Companies/getCompany";
import { updateCompany } from "@/features/companies/services/Companies/updateCompany";
import { checkServerRoles } from "@/lib/better-auth/checkServerRoles";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/better-auth/handleResponse";
import { isAuthenticated } from "@/lib/better-auth/isAuthenticated";
import { tryCatch, validateZodSchema } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await isAuthenticated();
  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });

  if (session) {
    const hasPermission = await checkServerRoles({
      userId: session?.user?.id || "",
      permissions: { company: ["read"] },
    });

    if (!hasPermission && false /*FOR TESTING*/) {
      return handleErrorResponse({
        statusCode: 403,
        message: "Forbidden: You don't have permission to view companies",
      });
    }
  }

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await isAuthenticated();

  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });

  // const hasPermission = await checkServerRoles({
  //   userId: session?.user?.id,
  //   permissions: { company: ["update"] },
  // });

  // if (!hasPermission && false /*FOR TESTING*/)
  //   return handleErrorResponse({
  //     statusCode: 403,
  //     message: "Forbidden: You don't have permission to delete companies",
  //   });

  const { data: body } = await tryCatch(req.json());

  const validatedBody = validateZodSchema(body, updateCompanySchema);

  const { error, data: updatedCompany } = await tryCatch(
    updateCompany(id, validatedBody),
  );

  if (error && "code" in error && error.code === "P2025")
    return handleErrorResponse({
      statusCode: 404,
      message: "There is no company with this ID to update",
    });

  if (error)
    return handleErrorResponse({
      statusCode: 400,
      message: "Failed to update company",
    });

  return handleSuccessResponse({
    statusCode: 200,
    data: updatedCompany,
    message: "Company updated successfully",
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await isAuthenticated();
  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });

  // const hasPermission = await checkServerRoles({
  //   userId: session?.user?.id || "",
  //   permissions: { company: ["delete"] },
  // });

  // if (!hasPermission && false /*FOR TESTING*/) {
  //   return handleErrorResponse({
  //     statusCode: 403,
  //     message: "Forbidden: You don't have permission to delete companies",
  //   });
  // }

  const { error, data: deletedCompany } = await tryCatch(deleteCompany(id));

  if (error && "code" in error && error.code === "P2025")
    return handleErrorResponse({
      statusCode: 404,
      message: "There is no company with this ID to delete",
    });

  if (error)
    return handleErrorResponse({
      statusCode: 400,
      message: "Failed to delete company",
    });

  return handleSuccessResponse({
    statusCode: 200,
    data: deletedCompany,
    message: "Company deleted successfully",
  });
}
