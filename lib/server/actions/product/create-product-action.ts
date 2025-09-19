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
import { getSessionCookieString, requirePermission } from "@/lib/server-utils";
import { uploadImage } from "@/lib/queries/upload/upload-image";
import { ActionResponse } from "@/lib/types/shared";

export async function createProductAction(
  inputs: CreateProductInputs
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
  const result = createProductSchema.safeParse(inputs);
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
  console.dir({ data }, { depth: null });
  const slug = slugify(data.name, { lower: true });
  try {
    // Check if the product already exists
    const productExists = await getProductBySlug(slug);

    if (productExists) {
      return {
        status: "error",
        error: {
          status: 409,

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
    console.log("produc created", { createdProduct });
    const imageUrl = await uploadImage({
      authCookie: await getSessionCookieString(),
      imageFile: data.img,
      pathname: `product_images/${createdProduct.id}`,
    });
    await prisma.product.update({
      where: { id: createdProduct.id },
      data: { image: imageUrl },
    });
    revalidateTag(PRISMA_CACHE_KEY.PRODUCTS);
    return {
      status: "success",

      message: "Product created successfully",
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
