"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
  registerInputs,
  RegisterSchema,
} from "@/lib/validation/register-schema";

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

export async function registerAction(
  registerInputsValues: RegisterSchema
): RegisterResponse {
  const result = registerInputs.safeParse(registerInputsValues); // 2min
  console.log(registerInputsValues);
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
    const hashedPassword = await bcrypt.hash(resultData.password, 10);

    await prisma.user.create({
      data: {
        name: `${resultData.firstName} ${resultData.lastName}`,
        email: resultData.email,
        phone: resultData.phone,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      status: 201,
      message: "Register Successful",
    };
  } catch (error) {
    console.log(error);
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
