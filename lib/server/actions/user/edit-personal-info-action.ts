"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/types/shared";
import {
  PersonalInformationInputs,
  personalInformationSchema,
} from "@/lib/validation/personal-information-schema";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";

export async function editPersonalInfoAction(
  inputs: PersonalInformationInputs
): ActionResponse {
  const session = await getCurrentSession();
  if (!session) {
    return {
      status: "error",
      error: {
        message: "Something went wrong, please try again.",
        status: 401,
      },
    };
  }
  const userId = session.user.id;

  const result = personalInformationSchema.safeParse(inputs);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    return {
      status: "validationError",
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: result.data.email }, { phone: result.data.phoneNumber }],
      NOT: { id: userId }, // exclude current user if updating
    },
  });

  if (existingUser) {
    return {
      status: "error",
      error: {
        status: 409,
        message:
          existingUser.email === result.data.email
            ? "Email is already in use."
            : "Phone number is already in use.",
      },
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: result.data.fullName,
        phone: result.data.phoneNumber,
        email: result.data.email,
      },
    });

    revalidateTag(PRISMA_CACHE_KEY.USERS);
    revalidateTag(`${PRISMA_CACHE_KEY.USERS}-${userId}`);
    return {
      status: "success",

      message: "Personal information updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",

      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
