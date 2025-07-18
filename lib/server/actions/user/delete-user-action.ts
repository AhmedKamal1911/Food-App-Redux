"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { getUserById } from "../../queries";
import { requirePermission } from "@/lib/server-utils";
import { getCurrentSession } from "@/lib/dal/user";

export async function deleteUserAction({
  userId,
}: {
  userId: string;
}): ActionResponse {
  if (!requirePermission(["superAdmin"])) {
    return {
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  try {
    const sessionRes = await getCurrentSession();

    if (!sessionRes.success) {
      return {
        success: false,
        error: {
          message: "Unauthorized action",
          status: 401,
        },
      };
    }

    const user = await getUserById(userId);

    if (!user) {
      return {
        error: {
          status: 404,
          message: "user not found",
        },
        success: false,
      };
    }
    if (userId === sessionRes.session.user.id) {
      return {
        success: false,
        error: {
          status: 401,
          message: "This user can't be removed",
        },
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
