"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import {
  UpdateUserInputs,
  updateUserSchema,
} from "@/lib/validation/update-user-schema";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getUserById } from "../../queries";
import { getCurrentSession } from "@/lib/dal/user";

type ErrorType = "error" | "validationError";

type FailedResponse = {
  success: false;
  error: {
    status?: number;
    message?: string;
    type: ErrorType;
  };
};

type SuccessResponse = {
  success: true;
  status: number;
  message: string;
};

type UpdateUserResponse = Promise<SuccessResponse | FailedResponse>;

export async function updateUserRoleAction(
  inputs: UpdateUserInputs
): UpdateUserResponse {
  // Validate Inputs
  const result = updateUserSchema.safeParse(inputs);
  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validationError",
      },
    };
  }

  const { data } = result;

  // Check if the user exists
  const userFromDb = await getUserById(data.id);
  if (!userFromDb) {
    return {
      success: false,
      error: {
        status: 404,
        message: "User doesn't exist.",
        type: "error",
      },
    };
  }

  // If the role has changed , return an error
  if (userFromDb.role === data.role) {
    return {
      success: false,
      error: {
        status: 409,
        message: "No changes detected.",
        type: "error",
      },
    };
  }

  try {
    const session = await getCurrentSession();
    if (!session) {
      return {
        success: false,
        error: {
          type: "error",
          message: "Unauthorized action",
          status: 401,
        },
      };
    }
    const loggedInUserRole = session.user.role;
    if (loggedInUserRole && userFromDb.role === "superAdmin") {
      return {
        success: false,
        error: {
          type: "error",
          status: 401,
          message: "Superadmin can't updated superadmin!",
        },
      };
    }
    if (loggedInUserRole === "admin") {
      return {
        success: false,
        error: {
          type: "error",
          status: 401,
          message: "Admin can't update anyone!",
        },
      };
    }

    // Update user
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        role: data.role,
      },
    });

    revalidateTag(PRISMA_CACHE_KEY.USERS);
    revalidateTag(`${PRISMA_CACHE_KEY.USERS}-${data.id}`);

    return {
      success: true,
      status: 200,
      message: `User Role  Updated Successfully.`,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: {
        status: 500,
        message: "An unexpected error occurred while updating the user.",
        type: "error",
      },
    };
  }
}
