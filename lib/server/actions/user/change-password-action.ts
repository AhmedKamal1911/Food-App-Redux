"use server";
import bcrypt from "bcrypt";

import {
  ChangePasswordInputs,
  changePasswordSchema,
} from "@/lib/validation/change-password-schema";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/server-utils";
import { ActionResponse } from "@/lib/types/shared";
import { getUserById } from "../../queries";
import { getCurrentSession } from "@/lib/dal/user";

export async function changePasswordAction(
  inputs: ChangePasswordInputs
): ActionResponse {
  const session = await getCurrentSession();
  if (!session) {
    return {
      status: "error",
      error: {
        status: 401,
        message: "Unauthorized action",
      },
    };
  }
  const result = changePasswordSchema.safeParse(inputs);
  const userId = session.user.id;
  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    return {
      status: "validationError",
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }
  // check first if the current password correct

  try {
    const user = await getUserById(userId);
    if (!user) {
      return {
        status: "error",
        error: {
          status: 400,
          message: "Something went wrong, please try again.",
        },
      };
    }
    const isPasswordCorrect = await bcrypt.compare(
      inputs.currentPassword,
      user.password!
    );

    if (!isPasswordCorrect) {
      return {
        status: "error",
        error: {
          status: 401,
          message: "Current password is incorrect.",
        },
      };
    }
    const hashedPassword = await hashPassword(result.data.newPassword);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
        passwordUpdatedAt: new Date(Date.now()),
      },
    });
    // Redirect to confirm reset code page
    return {
      status: "success",
      message: "Password Changed Successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
