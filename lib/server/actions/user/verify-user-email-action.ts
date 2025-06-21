"use server";
import { VerificationSuccessTemplate } from "@/emails/email-verification-template";
import prisma from "@/lib/prisma";

import { z } from "zod";
import { Resend } from "resend";
import { ActionResponse } from "@/lib/types/shared";
import { revalidateTag } from "next/cache";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function verifyUserEmailAction(token: string): ActionResponse {
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
    revalidateTag(PRISMA_CACHE_KEY.USERS);
    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [user.email],
      subject: "Email Verification Success!",
      react: VerificationSuccessTemplate({
        username: user.name,
      }),
    });
    return {
      success: true,
      data: { status: 200, message: "Email Verification Success!" },
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
