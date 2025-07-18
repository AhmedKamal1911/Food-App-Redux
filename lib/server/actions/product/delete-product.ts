"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { getProductById } from "../../queries";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { ActionResponse } from "@/lib/types/shared";
import { requirePermission } from "@/lib/server-utils";

export async function deleteProduct({
  productId,
}: {
  productId: string;
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
    const product = await getProductById(productId);

    if (!product) {
      return {
        error: {
          status: 404,
          message: "Product not found",
        },
        success: false,
      };
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    // TODO : revalidate the product tags
    revalidateTag(PRISMA_CACHE_KEY.PRODUCTS);
    return {
      success: true,
      data: {
        status: 200,
        message: "Product deleted successfully",
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
