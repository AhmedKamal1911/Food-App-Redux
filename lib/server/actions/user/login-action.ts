"use server";

import prisma from "@/lib/prisma";
import {
  loginSchema,
  LoginSchema,
  reqSchema,
} from "@/lib/validation/login-schema";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

type FailedResponse = z.infer<typeof reqSchema>;

type SuccessResponse = {
  success: true;
  status: number;
  message: string;
  user: {
    id: string;
    email: string;
    image: string | null;
    name: string;
    role: UserRole;
  };
};

type LoginResponse = Promise<SuccessResponse | FailedResponse>;

export async function loginAction(inputs: LoginSchema): LoginResponse {
  const result = loginSchema.safeParse(inputs);
  if (!result.success) {
    return {
      error: {
        type: "validationError",
      },
      success: false,
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user?.password) {
      return {
        success: false,
        error: {
          status: 400,
          message: "invalid email or password!",
          type: "error",
        },
      };
    }
    // Check if user exist
    if (!user) {
      return {
        success: false,
        error: {
          status: 404,
          message: "user not found",
          type: "error",
        },
      };
    }
    // check if the password is valid
    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password
    );
    if (!isValidPassword) {
      return {
        success: false,
        error: {
          status: 400,
          message: "invalid email or password!",
          type: "error",
        },
      };
    }

    return {
      success: true,
      status: 200,
      message: "login success",
      user: {
        id: user.id,
        email: user.email,
        image: user.image,
        name: user.name,
        role: user.role,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: {
        type: "error",
        status: 500,
        message: "internal server error",
      },
    };
  }
}
