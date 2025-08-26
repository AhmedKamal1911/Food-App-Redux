"use server";

import prisma from "@/lib/prisma";

import slugify from "slugify";

import {
  CreateCategoryInputs,
  createCategorySchema,
} from "@/lib/validation/create-category-schema";

import { revalidateTag } from "next/cache";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCategoryBySlug } from "../../queries";
import { requirePermission } from "@/lib/server-utils";
import { uploadImage } from "@/lib/server/queries/upload/upload-image";
import { ActionResponse } from "@/lib/types/shared";

export async function createCategoryAction(
  inputs: CreateCategoryInputs
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
  const result = createCategorySchema.safeParse(inputs);
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
    const slug = slugify(data.name, { lower: true });
    // Check if the Category already exists
    const categoryExist = await getCategoryBySlug(slug);

    if (categoryExist) {
      return {
        status: "error",
        error: {
          status: 409,

          message: `(${categoryExist.name}) Category already exists`,
        },
      };
    }

    const createdCategory = await prisma.productCategory.create({
      data: {
        name: data.name,
        slug,
      },
    });
    const imageUrl = await uploadImage({
      imageFile: data.img,
      pathname: `category_images/${createdCategory.id}`,
    });
    await prisma.productCategory.update({
      where: { id: createdCategory.id },
      data: { image: imageUrl },
    });
    revalidateTag(PRISMA_CACHE_KEY.CATEGORIES);
    return {
      status: "success",

      message: "Category created successfully",
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
