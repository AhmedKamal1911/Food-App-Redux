"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { getUserById } from "../../queries";
import { requirePermission } from "@/lib/server-utils";
import { getCurrentSession } from "@/lib/dal/user";
import { z } from "zod";

export async function deleteUserAction(userIdInput: string): ActionResponse {
  if (!requirePermission(["superAdmin"])) {
    return {
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  const result = z.string().safeParse(userIdInput);
  if (!result.success)
    return {
      success: false,
      error: { message: "Invalid Order ID", status: 400 },
    };
  const userId = result.data;
  console.log("from action", { userId });

  try {
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

    if (userId === session.user.id) {
      return {
        success: false,
        error: {
          status: 401,
          message: "This user can't be removed",
        },
      };
    }
    if (session.user.role === "superAdmin" && user.role === "superAdmin") {
      return {
        success: false,
        error: {
          status: 401,
          message: "Superadmin can't delete another superadmin",
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
    console.log("deleteddasdassssssssssssssss");
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
