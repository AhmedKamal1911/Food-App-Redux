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

type CreateProductResponse = Promise<
  SuccessResponse | FailedResponse | FailedValidationResponse
>;

export async function createProductAction(
  inputs: CreateProductInputs
): CreateProductResponse {
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
  const result = createProductSchema.safeParse(inputs);
  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validationError",
      },
    };
  }
  const { data } = result;
  const slug = slugify(data.name, { lower: true });
  try {
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

    const createdProduct = await prisma.product.create({
      data: {
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
    const imageUrl = await uploadImage({
      imageFile: data.img,
      pathname: `product_images/${createdProduct.id}`,
    });
    await prisma.product.update({
      where: { id: createdProduct.id },
      data: { image: imageUrl },
    });
    revalidateTag(PRISMA_CACHE_KEY.PRODUCTS);
    return {
      success: true,
      status: 201,
      message: "Product created successfully",
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
