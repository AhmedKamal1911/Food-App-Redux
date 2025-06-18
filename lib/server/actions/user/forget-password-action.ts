"use server";

import { ResetPasswordTemplate } from "@/emails/forget-password-template";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { z } from "zod";

const schema = z
  .string()
  .min(1, { message: "Email Requierd" })
  .email({ message: "invalid Email" });

type SuccessResponse = {
  success: true;
  status: number;
  email: string;
};
type FailedResponse = {
  success: false;
  email: string;
  error: {
    status: number;
    message: string;
  };
};

type ForgetPasswordResponse = Promise<SuccessResponse | FailedResponse>;
const resend = new Resend(process.env.RESEND_API_KEY);
export async function forgetPasswordAction(
  prevState: unknown,
  formData: FormData
): ForgetPasswordResponse {
  const formDataEmail = formData.get("email") as string;
  const result = schema.safeParse(formDataEmail);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    console.log(result.error.flatten());
    return {
      success: false,
      email: formDataEmail,
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }
  try {
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: result.data,
      },
    });

    if (!isEmailExist) {
      return {
        success: false,
        email: formDataEmail,
        error: {
          message: "Email is not exist",
          status: 404,
        },
      };
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: result.data },
    });

    if (!dbUser) {
      return {
        success: false,
        email: result.data,
        error: {
          message: "Email does not exist.",
          status: 404,
        },
      };
    }

    if (!dbUser.password) {
      return {
        success: false,
        email: result.data,
        error: {
          message:
            "This account was created using a social login and does not have a password.",
          status: 400,
        },
      };
    }

    // Redirect to confirm reset code page
    // Generate new token and expiry
    const passwordResetToken = randomBytes(32).toString("hex");
    const passwordTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    // Update user in DB
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        passwordResetToken: passwordResetToken,
        passwordTokenExpires: passwordTokenExpires,
      },
    });

    // Send email

    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [result.data],
      subject: "Reset your password",
      react: ResetPasswordTemplate({
        username: dbUser.name,
        resetToken: passwordResetToken,
      }),
    });
    return { success: true, email: "", status: 200 };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      email: result.data,
      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
