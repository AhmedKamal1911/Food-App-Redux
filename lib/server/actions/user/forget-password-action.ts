"use server";

import { sendForgetPasswordMessage } from "@/lib/emails";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

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

export async function forgetPasswordAction(
  prevState: unknown,
  formData: FormData
): ForgetPasswordResponse {
  const formDataEmail = formData.get("email") as string;
  const result = schema.safeParse(formDataEmail);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    return {
      success: false,
      email: formDataEmail,
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }
  const email = result.data;
  try {
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: email,
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
      where: { email: email },
    });

    if (!dbUser) {
      return {
        success: false,
        email: email,
        error: {
          message: "Email does not exist.",
          status: 404,
        },
      };
    }

    if (!dbUser.password) {
      return {
        success: false,
        email: email,
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

    await sendForgetPasswordMessage({
      email: email,
      username: dbUser.name,
      resetPwToken: passwordResetToken,
    });
    return { success: true, email: "", status: 200 };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      email: email,
      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
