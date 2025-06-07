"use server";
import { VerificationTemplate } from "@/emails/email-verification-template";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { Resend } from "resend";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Unauthorized error.",
      },
    };
  }

  try {
    // Generate new token and expiry
    const emailToken = randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Update user in DB
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        emailVerificationToken: emailToken,
        emailVerificationExpires,
      },
    });

    // Send email

    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [session.user.email],
      subject: "Verify your email address",
      react: VerificationTemplate({
        username: session.user.name,
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
