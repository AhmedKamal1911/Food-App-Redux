"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/types/shared";
import {
  PersonalInformationInputs,
  personalInformationSchema,
} from "@/lib/validation/personal-information-schema";
import { revalidateTag } from "next/cache";
import { getUserById } from "../../queries";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";

export async function EditPersonalInfoAction(
  inputs: PersonalInformationInputs,
  userId: string
): ActionResponse {
  const result = personalInformationSchema.safeParse(inputs);

  if (!result.success) {
    const errorMsg = result.error.flatten().formErrors[0];
    console.log(result.error.flatten());
    return {
      success: false,
      error: {
        message: errorMsg,
        status: 400,
      },
    };
  }
  // check first if the user exist
  const user = await getUserById(userId);
  if (!user) {
    return {
      success: false,
      error: {
        status: 404,
        message: "user not found!",
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
    return {
      success: true,
      data: {
        status: 200,
        message: "Personal information updated successfully.",
      },
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,

      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
