"use server";

import slugify from "slugify";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import {
  UpdateCategoryInputs,
  updateCategorySchema,
} from "@/lib/validation/update-category-schema";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCategoryById, getCategoryBySlug } from "../../queries";
import { requirePermission } from "@/lib/server-utils";
import { uploadImage } from "@/lib/queries/upload/upload-image";

type ErrorType = "error" | "validationError";

type FailedResponse = {
  success: false;
  error: {
    status?: number;
    message?: string;
    type: ErrorType;
  };
};

type SuccessResponse = {
  success: true;
  status: number;
  message: string;
};

type UpdateCategoryResponse = Promise<SuccessResponse | FailedResponse>;

export async function updateCategoryAction(
  inputs: UpdateCategoryInputs
): UpdateCategoryResponse {
  if (!requirePermission(["admin", "superAdmin"])) {
    return {
      success: false,
      error: {
        message: "Unauthorized action",
        status: 401,
        type: "error",
      },
    };
  }
  // Validate Inputs
  const result = updateCategorySchema.safeParse(inputs);
  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validationError",
      },
    };
  }

  const { data } = result;

  try {
    // Check if the category exists
    const categoryFromDb = await getCategoryById(data.id);
    if (!categoryFromDb) {
      return {
        success: false,
        error: {
          status: 404,
          message: "Category doesn't exist.",
          type: "error",
        },
      };
    }

    let newCategorySlug = categoryFromDb.slug;

    // If the name has changed, generate new slug and check for uniqueness
    if (categoryFromDb.name !== data.name) {
      newCategorySlug = slugify(data.name, { lower: true });

      const existingCategory = await getCategoryBySlug(newCategorySlug);
      if (existingCategory) {
        return {
          success: false,
          error: {
            status: 409,
            message: `Category "${existingCategory.name}" already exists.`,
            type: "error",
          },
        };
      }
    }

    const imageUrl = data.img
      ? await uploadImage({
          imageFile: data.img,
          pathname: `category_images/${categoryFromDb.id}`,
        })
      : categoryFromDb.image;
    // Update Category
    await prisma.productCategory.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: newCategorySlug,
        image: imageUrl,
      },
    });

    revalidateTag(PRISMA_CACHE_KEY.CATEGORIES);

    return {
      success: true,
      status: 200,
      message: `Category "${data.name}" updated successfully.`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: {
        status: 500,
        message: "An unexpected error occurred while updating the category.",
        type: "error",
      },
    };
  }
}
