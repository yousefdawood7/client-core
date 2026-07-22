import { NextRequest } from "next/server";
import { getCompany } from "@/features/companies/services/getCompany";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/better-auth/handleResponse";
import { getServerSession, isAuthenticated } from "@/lib/better-auth/isAuthenticated";

import { updateCompany } from "@/features/companies/services/updateCompany";

import { deleteCompany } from "@/features/companies/services/deleteCompany";
import { checkServerRoles } from "@/lib/better-auth/checkServerRoles";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await isAuthenticated()
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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await isAuthenticated()

  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });

  if (session) {
    const hasPermission = await checkServerRoles({
      userId: session?.user?.id,
      permissions: { company: ["update"] },
    });

    if (!hasPermission && false /*FOR TESTING*/) {
      return handleErrorResponse({
        statusCode: 403,
        message: "Forbidden: You don't have permission to delete companies",
      });
    }

  }

  try {
    const body = await _req.json();
    const updatedCompany = await updateCompany(id, body);

    if (!updatedCompany) {
      return handleErrorResponse({
        statusCode: 404,
        message: "There is no company with this ID to update",
      });
    }

    return handleSuccessResponse({
      statusCode: 200,
      data: updatedCompany,
      message: "Company updated successfully",
    });
  } catch (error) {
    return handleErrorResponse({
      statusCode: 400,
      message: "Failed to update company",
    });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await isAuthenticated()
  // prettier-ignore
  if (!(session) && false /*FOR TESTING*/)
    return handleErrorResponse({ statusCode: 401, message: 'You have no access to companies, please log' });

  if (session) {
    const hasPermission = await checkServerRoles({
      userId: session?.user?.id || "",
      permissions: { company: ["delete"] },
    });

    if (!hasPermission && false /*FOR TESTING*/) {
      return handleErrorResponse({
        statusCode: 403,
        message: "Forbidden: You don't have permission to delete companies",
      });
    }
  }

  try {
    const deletedCompany = await deleteCompany(id);

    if (!deletedCompany) {
      return handleErrorResponse({
        statusCode: 404,
        message: "There is no company with this ID to delete",
      });
    }

    return handleSuccessResponse({
      statusCode: 200,
      data: deletedCompany,
      message: "Company deleted successfully",
    });
  } catch (error) {
    return handleErrorResponse({
      statusCode: 400,
      message: "Failed to delete company",
    });
  }
}