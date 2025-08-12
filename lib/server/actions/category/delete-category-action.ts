"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { getCategoryById } from "../../queries";
import { requirePermission } from "@/lib/server-utils";
import { z } from "zod";
import cloudinary from "@/lib/cloudinary";

export async function deleteCategoryAction(
  categoryIdInput: string
): ActionResponse {
  if (!requirePermission(["admin", "superAdmin"])) {
    return {
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  const result = z.string().safeParse(categoryIdInput);
  if (!result.success)
    return {
      success: false,
      error: { message: "Invalid Category ID", status: 400 },
    };
  const categoryId = result.data;
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
    if (category.image) {
      const url = category.image;
      const matches = url.match(
        /\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)$/
      );

      const publicId = matches ? matches[1] : null;

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
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
