"use server";

import { AVALIABLE_EMAILS } from "@/lib/data";
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
  email: string
): ForgetPasswordResponse {
  const result = schema.safeParse(email);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    console.log(result.error.flatten());
    return {
      success: false,
      email,
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }
  try {
    const isExistEmail = AVALIABLE_EMAILS.find((e) => email === e);
    // TODO: add the fetch from db logic here
    if (!isExistEmail) {
      return {
        success: false,
        email,
        error: {
          message: "Email is not exist",
          status: 404,
        },
      };
    }
    // Redirect to confirm reset code page
    return { success: true, email, status: 200 };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      email,
      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
