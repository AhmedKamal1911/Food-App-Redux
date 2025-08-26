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
import { uploadImage } from "@/lib/server/queries/upload/upload-image";
import { ActionResponse } from "@/lib/types/shared";

export async function updateCategoryAction(
  inputs: UpdateCategoryInputs
): ActionResponse {
  if (!requirePermission(["admin", "superAdmin"])) {
    return {
      status: "error",
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  // Validate Inputs
  const result = updateCategorySchema.safeParse(inputs);
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        message: "Some inputs missed!",
        status: 400,
      },
    };
  }

  const { data } = result;

  try {
    // Check if the category exists
    const categoryFromDb = await getCategoryById(data.id);
    if (!categoryFromDb) {
      return {
        status: "error",
        error: {
          status: 404,
          message: "Category doesn't exist.",
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
          status: "error",
          error: {
            status: 409,
            message: `Category "${existingCategory.name}" already exists.`,
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
      status: "success",

      message: `Category "${data.name}" updated successfully.`,
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: {
        status: 500,
        message: "An unexpected error occurred while updating the category.",
      },
    };
  }
}
