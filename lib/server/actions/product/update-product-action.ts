"use server";

import {
  UpdateProductInputs,
  updateProductSchema,
} from "@/lib/validation/update-product-schema";
import slugify from "slugify";
import { getProductById, getProductBySlug } from "../../queries";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
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

type UpdateProductResponse = Promise<
  SuccessResponse | FailedResponse | FailedValidationResponse
>;

export async function updateProductAction(
  inputs: UpdateProductInputs
): UpdateProductResponse {
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
  const result = updateProductSchema.safeParse(inputs);
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
    const productFromDb = await getProductById(data.id);
    if (!productFromDb) {
      return {
        success: false,

        error: {
          status: 404,
          message: "Product Doesn't Exist!",
          type: "error",
        },
      };
    }

    const newProductSlug = slugify(data.name, { lower: true }); // create product slug
    if (productFromDb.name !== data.name) {
      const existingProduct = await getProductBySlug(newProductSlug);
      if (existingProduct) {
        return {
          success: false,
          error: {
            message: `${existingProduct.name} Product is already exist!`,
            status: 409,
            type: "error",
          },
        };
      }
    }
    // TODO: upload image using cloudinary and store image url in product.

    // DB SIZES : [{id:1,},{id:2}]
    // Client Sizes: [{id:2},{..},{..}]
    // Client Sizes: [{..},{..}]
    // Client Sizes: []
    const deletedSizes = productFromDb.sizes.filter(
      (dbSize) => !data.sizes.find((s) => dbSize.id === s.id)
    );
    const deletedExtras = productFromDb.extras.filter(
      (dbExtra) => !data.extras.find((ex) => dbExtra.id === ex.id)
    );
    console.dir({ deletedSizes, clientSizes: data.sizes }, { depth: null });
    await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: newProductSlug,
        price: data.price,
        categoryId: data.categoryId,
        description: data.desc,
        image:
          data.img === undefined || data.img.size === 0
            ? productFromDb.image
            : "/images/special-products/lemon.png",
        sizes: {
          deleteMany: deletedSizes.map((s) => ({ id: s.id })),
          upsert: data.sizes.map((s) => ({
            where: { id: s.id ?? "" },
            create: s,
            update: s,
          })),
        },
        extras: {
          deleteMany: deletedExtras.map((ex) => ({ id: ex.id })),
          upsert: data.extras.map((ex) => ({
            where: { id: ex.id ?? "" },
            create: ex,
            update: ex,
          })),
        },
      },
    });
    revalidateTag(PRISMA_CACHE_KEY.PRODUCTS);
    return {
      success: true,
      status: 200,
      message: `${data.name} updated successfully`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: {
        message: "An Error Occurred",
        status: 500,
        type: "error",
      },
    };
  }
}
