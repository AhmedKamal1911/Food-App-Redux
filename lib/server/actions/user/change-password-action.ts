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

export async function ChangePasswordAction(
  inputs: ChangePasswordInputs,
  userId: string
): ActionResponse {
  const result = changePasswordSchema.safeParse(inputs);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    console.log(result.error.flatten());
    return {
      success: false,
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }
  // check first if the current password correct
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
  try {
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
  } catch (error) {
    console.log(error);

    return {
      success: false,

      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
