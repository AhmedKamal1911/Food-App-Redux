"use server";
import bcrypt from "bcrypt";

import {
  ChangePasswordInputs,
  changePasswordSchema,
} from "@/lib/validation/change-password-schema";
import { getUserById } from "../../queries/user";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/server-utils";

type SuccessResponse = {
  success: true;
  status: number;
};
type FailedResponse = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};

type ForgetPasswordResponse = Promise<SuccessResponse | FailedResponse>;

export async function ChangePasswordAction(
  inputs: ChangePasswordInputs,
  userId: string
): ForgetPasswordResponse {
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
    return { success: true, status: 200 };
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
