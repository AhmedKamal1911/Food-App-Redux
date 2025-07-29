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
import { uploadImage } from "@/lib/queries/upload/upload-image";

type FailedResponse = {
  success: false;
  error: {
    status: number;
    message: string;
    type: "error";
  };
};
type FailedValidationResponse = {
  success: false;
  error: {
    type: "validationError";
  };
};

type SuccessResponse = {
  success: true;
  status: number;
  message: string;
};

type CreateCategoryResponse = Promise<
  SuccessResponse | FailedResponse | FailedValidationResponse
>;

export async function createCategoryAction(
  inputs: CreateCategoryInputs
): CreateCategoryResponse {
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
  const result = createCategorySchema.safeParse(inputs);
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
    const slug = slugify(data.name, { lower: true });
    // Check if the Category already exists
    const categoryExist = await getCategoryBySlug(slug);

    if (categoryExist) {
      return {
        success: false,
        error: {
          status: 409,
          type: "error",
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
      success: true,
      status: 201,
      message: "Category created successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: {
        status: 500,
        type: "error",
        message: "Internal server error",
      },
    };
  }
}
