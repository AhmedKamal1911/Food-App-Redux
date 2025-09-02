"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { getUserById } from "../../queries";
import { deleteImageFromBucket, requirePermission } from "@/lib/server-utils";
import { getCurrentSession } from "@/lib/dal/user";
import { z } from "zod";

export async function deleteUserAction(userIdInput: string): ActionResponse {
  if (!requirePermission(["superAdmin"])) {
    return {
      status: "error",
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  const result = z.string().safeParse(userIdInput);
  if (!result.success)
    return {
      status: "validationError",
      error: { message: "Invalid Order ID", status: 400 },
    };
  const userId = result.data;

  try {
    const session = await getCurrentSession();

    if (!session) {
      return {
        status: "error",
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
        status: "error",
      };
    }

    if (userId === session.user.id) {
      return {
        status: "error",
        error: {
          status: 401,
          message: "This user can't be removed",
        },
      };
    }
    if (session.user.role === "superAdmin" && user.role === "superAdmin") {
      return {
        status: "error",
        error: {
          status: 401,
          message: "Superadmin can't delete another superadmin",
        },
      };
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    await deleteImageFromBucket(userId);
    revalidateTag(PRISMA_CACHE_KEY.USERS);
    return {
      status: "success",
      message: "User Deleted Successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: {
        status: 500,
        message: "Internal server error",
      },
    };
  }
}
