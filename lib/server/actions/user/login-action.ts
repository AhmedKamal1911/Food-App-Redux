"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/types/shared";
import { loginSchema, LoginSchema } from "@/lib/validation/login-schema";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

export async function loginAction(inputs: LoginSchema): ActionResponse<{
  id: string;
  email: string;
  image: string | null;
  name: string;
  role: UserRole;
}> {
  const result = loginSchema.safeParse(inputs);
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        message: "Some inputs missed!",
        status: 400,
      },
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
        status: "error",
        error: {
          status: 400,
          message: "invalid email or password!",
        },
      };
    }
    // Check if user exist
    if (!user) {
      return {
        status: "error",
        error: {
          status: 404,
          message: "user not found",
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
        status: "error",
        error: {
          status: 400,
          message: "invalid email or password!",
        },
      };
    }

    return {
      status: "success",

      message: "login success",
      data: {
        id: user.id,
        email: user.email,
        image: user.image,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: {
        status: 500,
        message: "internal server error",
      },
    };
  }
}
