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
    console.log("Validation error:", result.error.format());
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
    // TODO: upload image using cloudinary and store image url in product.
    await prisma.productCategory.create({
      data: {
        image: "/images/special-products/burger.png",
        name: data.name,
        slug,
      },
    });
    revalidateTag(PRISMA_CACHE_KEY.CATEGORIES);
    return {
      success: true,
      status: 201,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);
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
