"use server";

import prisma from "@/lib/prisma";

import { Resend } from "resend";
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "@/lib/validation/reset-password-schema";
import { ResetPasswordSuccessTemplate } from "@/emails/reset-password-success-template";
import { hashPassword } from "@/lib/server-utils";
import { ActionResponse } from "@/lib/types/shared";

const resend = new Resend(process.env.RESEND_API_KEY);
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
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: result.data.token,
        passwordTokenExpires: { gte: new Date() },
      },
    });
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
    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [user.email],
      subject: "Password Reset Success!",
      react: ResetPasswordSuccessTemplate({
        username: user.name,
      }),
    });
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
