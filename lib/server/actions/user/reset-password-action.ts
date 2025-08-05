"use server";

import prisma from "@/lib/prisma";

import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "@/lib/validation/reset-password-schema";

import { hashPassword } from "@/lib/server-utils";
import { ActionResponse } from "@/lib/types/shared";
import { getUserByResetToken } from "../../queries";
import { sendResetPwMessage } from "@/lib/emails";

export async function resetPasswordAction(
  values: ResetPasswordInputs
): ActionResponse {
  const result = resetPasswordSchema.safeParse(values);

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

  try {
    const user = await getUserByResetToken(values.token);
    if (!user) {
      return {
        success: false,
        error: {
          status: 400,
          message: "Invalid or expired reset token.",
        },
      };
    }
    const hashedPassword = await hashPassword(result.data.newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordUpdatedAt: new Date(Date.now()),
        passwordResetToken: null,
        passwordTokenExpires: null,
        password: hashedPassword,
      },
    });
    await sendResetPwMessage({ email: user.email, name: user.name });
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
