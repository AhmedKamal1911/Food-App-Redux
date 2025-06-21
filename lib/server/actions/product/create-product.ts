"use server";

import prisma from "@/lib/prisma";
import {
  CreateProductInputs,
  createProductSchema,
} from "@/lib/validation/create-product-schema";
import slugify from "slugify";

import { revalidateTag } from "next/cache";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getProductBySlug } from "../../queries";

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

type CreateProductResponse = Promise<
  SuccessResponse | FailedResponse | FailedValidationResponse
>;
// TODO: build auth role

export async function createProduct(
  inputs: CreateProductInputs
): CreateProductResponse {
  const result = createProductSchema.safeParse(inputs);
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
    // Check if the product already exists
    const productExists = await getProductBySlug(slug);

    if (productExists) {
      return {
        success: false,
        error: {
          status: 409,
          type: "error",
          message: `(${productExists.name}) Product already exists`,
        },
      };
    }
    // TODO: upload image using cloudinary and store image url in product.
    await prisma.product.create({
      data: {
        image: "/images/special-products/burger.png",
        name: data.name,
        description: data.desc,
        price: data.price,
        categoryId: data.categoryId,
        slug,
        extras: {
          createMany: {
            data: data.extras,
          },
        },
        sizes: { createMany: { data: data.sizes } },
      },
    });
    revalidateTag(PRISMA_CACHE_KEY.PRODUCTS);
    return {
      success: true,
      status: 201,
      message: "Product created successfully",
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
