"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  UpdateUserInputs,
  updateUserSchema,
} from "@/lib/validation/update-user-schema";
import { getUserById } from "../../queries/user";

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

export async function updateUserAction(
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
    // Update user
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        role: data.role,
      },
    });

    // TODO: by tag Revalidate the cache for the user page
    revalidatePath("/dashboard");

    return {
      success: true,
      status: 200,
      message: `User Role  Updated Successfully.`,
    };
  } catch (error) {
    console.error("Failed to update user:", error);

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
