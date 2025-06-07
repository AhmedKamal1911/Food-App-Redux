"use server";
import { VerificationSuccessTemplate } from "@/emails/email-verification-template";
import prisma from "@/lib/prisma";

import { z } from "zod";
import { Resend } from "resend";
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

type VerifyUserEmailResponse = Promise<SuccessResponse | FailedResponse>;
const resend = new Resend(process.env.RESEND_API_KEY);
export async function VerifyUserEmailAction(
  token: string
): VerifyUserEmailResponse {
  const result = z
    .string({
      message: "emailVerificationToken must be string",
    })
    .safeParse(token);

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
        emailVerificationToken: result.data,
        emailVerificationExpires: { gte: new Date() },
      },
    });
    if (!user) {
      return {
        success: false,
        error: {
          status: 400,
          message: "Invalid or expired verification token.",
        },
      };
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });
    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [user.email],
      subject: "Email Verification Success!",
      react: VerificationSuccessTemplate({
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
