"use server";
import { VerificationTemplate } from "@/emails/email-verification-template";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { Resend } from "resend";

import { getCurrentSession } from "@/lib/dal/user";
const resend = new Resend(process.env.RESEND_API_KEY);

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

type ResendVerificationEmailResponse = Promise<
  SuccessResponse | FailedResponse
>;

export async function resendVerificationEmailAction(): Promise<ResendVerificationEmailResponse> {
  const sessionResult = await getCurrentSession();

  if (!sessionResult.success) {
    return sessionResult;
  }

  const user = sessionResult.session.user;

  try {
    // Generate new token and expiry
    const emailToken = randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Update user in DB
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: emailToken,
        emailVerificationExpires,
      },
    });

    // Send email

    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [user.email],
      subject: "Verify your email address",
      react: VerificationTemplate({
        username: user.name,
        emailVerificationToken: emailToken,
      }),
    });

    return { success: true, status: 200 };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: { status: 500, message: "Failed to resend verification email." },
    };
  }
}
