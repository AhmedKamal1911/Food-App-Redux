"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteProductSuccess = {
  success: true;
  data: {
    status: 200;
    message: string;
  };
};
type DeleteProductFailed = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};
type DeleteProductResponse = Promise<
  DeleteProductSuccess | DeleteProductFailed
>;

export async function deleteProduct({
  productId,
}: {
  productId: string;
}): DeleteProductResponse {
  try {
    // First check if the product exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

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
    revalidatePath("/dashboard/products");
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
