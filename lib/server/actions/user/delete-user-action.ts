"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { getUserById } from "../../queries";

export async function deleteUserAction({
  userId,
}: {
  userId: string;
}): ActionResponse {
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

    revalidateTag(PRISMA_CACHE_KEY.USERS);
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
