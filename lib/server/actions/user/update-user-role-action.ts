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
import { ActionResponse } from "@/lib/types/shared";

export async function updateUserRoleAction(
  inputs: UpdateUserInputs
): ActionResponse {
  // Validate Inputs
  const result = updateUserSchema.safeParse(inputs);
  if (!result.success) {
    return {
      status: "validationError",

      error: {
        message: "Some inputs missed!",
        status: 400,
      },
    };
  }

  const { data } = result;

  // Check if the user exists
  const userFromDb = await getUserById(data.id);
  if (!userFromDb) {
    return {
      status: "error",
      error: {
        status: 404,
        message: "User doesn't exist.",
      },
    };
  }

  // If the role has changed , return an error
  if (userFromDb.role === data.role) {
    return {
      status: "error",
      error: {
        status: 409,
        message: "No changes detected.",
      },
    };
  }

  try {
    const session = await getCurrentSession();
    if (!session) {
      return {
        status: "error",
        error: {
          message: "Unauthorized action",
          status: 401,
        },
      };
    }
    const loggedInUserRole = session.user.role;
    if (loggedInUserRole && userFromDb.role === "superAdmin") {
      return {
        status: "error",
        error: {
          status: 401,
          message: "Superadmin can't updated superadmin!",
        },
      };
    }
    if (loggedInUserRole === "admin") {
      return {
        status: "error",
        error: {
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
      status: "success",

      message: `User Role  Updated Successfully.`,
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: {
        status: 500,
        message: "An unexpected error occurred while updating the user.",
      },
    };
  }
}
