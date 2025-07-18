"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { getCategoryById } from "../../queries";
import { requirePermission } from "@/lib/server-utils";

export async function deleteCategory({
  categoryId,
}: {
  categoryId: string;
}): ActionResponse {
  if (!requirePermission(["admin", "superAdmin"])) {
    return {
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  try {
    // First check if the product exists

    const category = await getCategoryById(categoryId);

    if (!category) {
      return {
        error: {
          status: 404,
          message: "Category not found",
        },
        success: false,
      };
    }

    await prisma.productCategory.delete({
      where: {
        id: categoryId,
      },
    });

    revalidateTag(PRISMA_CACHE_KEY.CATEGORIES);
    return {
      success: true,
      data: {
        status: 200,
        message: "Category deleted successfully",
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
