"use server";

import prisma from "@/lib/prisma";

import { Resend } from "resend";
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "@/lib/validation/reset-password-schema";
import { ResetPasswordSuccessTemplate } from "@/emails/reset-password-success-template";
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

type ResetPasswordAction = Promise<SuccessResponse | FailedResponse>;
const resend = new Resend(process.env.RESEND_API_KEY);
export async function resetPasswordAction(
  values: ResetPasswordInputs
): ResetPasswordAction {
  const result = resetPasswordSchema.safeParse(values);

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
