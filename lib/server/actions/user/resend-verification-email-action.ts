"use server";

import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

import { getCurrentSession } from "@/lib/dal/user";
import { ActionResponse } from "@/lib/types/shared";
import { sendVerificationEmailMessage } from "@/lib/emails";

export async function resendVerificationEmailAction(): ActionResponse {
  const session = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }

  const user = session.user;

  try {
    // Generate new token and expiry
    const emailToken = randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 15 * 1000);

    // Update user in DB
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: emailToken,
        emailVerificationExpires,
      },
    });

    // Send email

    await sendVerificationEmailMessage({
      email: user.email,
      username: user.name,
      emailVerificationToken: emailToken,
    });

    return {
      success: true,
      data: { message: "Verification email resent successfully.", status: 200 },
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: { status: 500, message: "Failed to resend verification email." },
    };
  }
}
