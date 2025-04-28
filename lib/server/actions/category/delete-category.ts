"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCategoryById } from "../../queries/category/get-category-by-id";

type DeleteCategorySuccess = {
  success: true;
  data: {
    status: number;
    message: string;
  };
};
type DeleteCategoryFailed = {
  success: false;
  error: {
    status: number;
    message: string;
  };
};
type DeleteCategoryResponse = Promise<
  DeleteCategorySuccess | DeleteCategoryFailed
>;

export async function deleteCategory({
  categoryId,
}: {
  categoryId: string;
}): DeleteCategoryResponse {
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
    // TODO : revalidate the category tags
    revalidatePath("/dashboard/categories");
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
