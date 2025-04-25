"use server";

import prisma from "@/lib/prisma";
import {
  CreateProductInputs,
  createProductSchema,
} from "@/lib/validation/create-product-schema";
import slugify from "slugify";
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
export async function createProduct(
  inputs: CreateProductInputs
): CreateProductResponse {
  try {
    const slug = slugify(inputs.name, { lower: true });
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

    await prisma.product.create({
      data: {
        image: "/images/special-products/burger.png",
        name: inputs.name,
        description: inputs.desc,
        price: inputs.price,
        categoryId: inputs.categoryId,
        slug,
        extras: {
          createMany: {
            data: inputs.extras,
          },
        },
        sizes: { createMany: { data: inputs.sizes } },
      },
    });
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
