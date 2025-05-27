"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { getUserById } from "../../queries/user";

type DeleteUserSuccess = {
  success: true;
  data: {
    status: number;
    message: string;
  };
};
type DeleteUserFailed = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};
type DeleteUserResponse = Promise<DeleteUserSuccess | DeleteUserFailed>;

export async function deleteUserAction({
  userId,
}: {
  userId: string;
}): DeleteUserResponse {
  try {
    // First check if the product exists

    const product = await getUserById(userId);

    if (!product) {
      return {
        error: {
          status: 404,
          message: "user not found",
        },
        success: false,
      };
    }
    // TODO: dont forget to remove user images from storage
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    // TODO : revalidate the USER tags
    revalidatePath("/dashboard");
    return {
      success: true,
      data: {
        status: 200,
        message: "User Deleted Successfully",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: {
        status: 500,
        message: "Internal server error",
      },
      success: false,
    };
  }
}
