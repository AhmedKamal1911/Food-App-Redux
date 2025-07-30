"use server";
import prisma from "@/lib/prisma";

import {
  registerInputs,
  RegisterSchema,
} from "@/lib/validation/register-schema";
import { randomBytes } from "crypto";
import { Resend } from "resend";
import { VerificationTemplate } from "@/emails/email-verification-template";
import { hashPassword } from "@/lib/server-utils";

import parsePhoneNumber from "libphonenumber-js";
type FailedResponse = {
  success: false;
  error: {
    status: number;
    message: string;
    type: "error";
  };
};
type FailedValidationResponse = {
  success: false;
  error: {
    type: "validationError";
  };
};

type SuccessResponse = {
  success: true;
  status: number;
  message: string;
};

type RegisterResponse = Promise<
  SuccessResponse | FailedResponse | FailedValidationResponse
>;
// TODO: make this type guard shared

const resend = new Resend(process.env.RESEND_API_KEY);
export async function registerAction(
  registerInputsValues: RegisterSchema
): RegisterResponse {
  const result = registerInputs.safeParse(registerInputsValues); // 2min
  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validationError",
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
      success: false,
      error: {
        type: "error",
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
      success: true,
      status: 201,
      message: "Register Successful Message Has Been Sent To Email",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: {
        message: "An Error Occurred",
        status: 500,
        type: "error",
      },
    };
  }
}
