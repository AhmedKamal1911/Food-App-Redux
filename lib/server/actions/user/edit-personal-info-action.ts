"use server";

import { getUserById } from "../../queries/user";
import prisma from "@/lib/prisma";
import {
  PersonalInformationInputs,
  personalInformationSchema,
} from "@/lib/validation/personal-information-schema";
import { revalidatePath } from "next/cache";

type SuccessResponse = {
  success: true;
  status: number;
};
type FailedResponse = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};

type EditPersonalInfoResponse = Promise<SuccessResponse | FailedResponse>;

export async function EditPersonalInfoAction(
  inputs: PersonalInformationInputs,
  userId: string
): EditPersonalInfoResponse {
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
    // TODO: revalidate tag
    revalidatePath("/account");
    return { success: true, status: 200 };
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
