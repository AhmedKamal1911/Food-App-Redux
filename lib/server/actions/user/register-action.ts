"use server";
import prisma from "@/lib/prisma";

import {
  registerInputs,
  RegisterSchema,
} from "@/lib/validation/register-schema";
import { randomBytes } from "crypto";

import { VerificationTemplate } from "@/emails/email-verification-template";
import { hashPassword } from "@/lib/server-utils";

import parsePhoneNumber from "libphonenumber-js";
import { resend } from "@/lib/resend";
import { ActionResponse } from "@/lib/types/shared";

export async function registerAction(
  registerInputsValues: RegisterSchema
): ActionResponse {
  const result = registerInputs.safeParse(registerInputsValues); // 2min
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        message: "Some inputs missed!",
        status: 400,
      },
    };
  }
  const resultData = result.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: resultData.email }, { phone: resultData.phone }],
    },
  });

  if (existingUser) {
    return {
      status: "error",
      error: {
        status: 409,
        message: "Email or Phone Already exists",
      },
    };
  }

  try {
    const hashedPassword = await hashPassword(resultData.password);
    const emailToken = randomBytes(32).toString("hex");

    await prisma.user.create({
      data: {
        name: `${resultData.firstName} ${resultData.lastName}`,
        email: resultData.email,
        phone: resultData.phone,
        country: parsePhoneNumber(resultData.phone)?.country,
        password: hashedPassword,
        emailVerificationToken: emailToken,
        emailVerificationExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      },
    });
    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [resultData.email],
      subject: "Hello world",
      react: VerificationTemplate({
        username: resultData.firstName,
        emailVerificationToken: emailToken,
      }),
    });
    return {
      status: "success",

      message: "Register Successful Message Has Been Sent To Email",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: {
        message: "An Error Occurred",
        status: 500,
      },
    };
  }
}
