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
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  const userId = session.user.id;

  const result = personalInformationSchema.safeParse(inputs);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    return {
      success: false,
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }

  // Checking if phone number used
  const isPhoneNumberInUse = await prisma.user.findFirst({
    where: {
      phone: result.data.phoneNumber,
      NOT: { id: userId },
    },
  });

  if (isPhoneNumberInUse) {
    return {
      success: false,
      error: {
        status: 409,
        message: "Phone number is already in use.",
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
      },
    });

    revalidateTag(PRISMA_CACHE_KEY.USERS);
    revalidateTag(`${PRISMA_CACHE_KEY.USERS}-${userId}`);
    return {
      success: true,
      data: {
        status: 200,
        message: "Personal information updated successfully.",
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,

      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
