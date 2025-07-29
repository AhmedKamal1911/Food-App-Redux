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
      success: false,
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
      success: false,
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
        success: false,
        error: {
          status: 404,
          message: "user not found!",
        },
      };
    }
    const isPasswordCorrect = await bcrypt.compare(
      inputs.currentPassword,
      user.password!
    );

    if (!isPasswordCorrect) {
      return {
        success: false,
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
      success: true,
      data: { status: 200, message: "Password Changed Successfully." },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,

      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
