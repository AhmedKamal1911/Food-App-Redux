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
import bcrypt from "bcrypt";

export async function resetPasswordAction(
  values: ResetPasswordInputs
): ActionResponse {
  const result = resetPasswordSchema.safeParse(values);

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

  try {
    const user = await getUserByResetToken(values.token);
    if (!user) {
      return {
        status: "error",
        error: {
          status: 404,
          message: "Invalid or expired reset token.",
        },
      };
    }
    const hashedPassword = await hashPassword(result.data.newPassword);
    // Check if new password is same as old one
    const isSamePassword = await bcrypt.compare(
      result.data.newPassword,
      user.password!
    );

    if (isSamePassword) {
      return {
        status: "validationError",
        error: {
          message: "New password cannot be the same as the old password.",
          status: 400,
        },
      };
    }

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
