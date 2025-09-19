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
import {
  deleteImageFromBucket,
  getSessionCookieString,
  requirePermission,
} from "@/lib/server-utils";
import { uploadImage } from "@/lib/queries/upload/upload-image";
import { ActionResponse } from "@/lib/types/shared";
import { Prisma } from "@prisma/client";
import { extractPublicIdFromUrl } from "@/lib/utils";

export async function updateProductAction({
  inputs,
  productImg,
}: {
  inputs: UpdateProductInputs;
  productImg: string | null;
}): ActionResponse {
  if (!requirePermission(["admin", "superAdmin"])) {
    return {
      status: "error",
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }
  const result = updateProductSchema.safeParse(inputs);
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
    const productFromDb = await getProductById(data.id);
    if (!productFromDb) {
      return {
        status: "error",

        error: {
          status: 404,
          message: "Product Doesn't Exist!",
        },
      };
    }

    const newProductSlug = slugify(data.name, { lower: true }); // create product slug
    if (productFromDb.name !== data.name) {
      const existingProduct = await getProductBySlug(newProductSlug);
      if (existingProduct) {
        return {
          status: "error",
          error: {
            message: `${existingProduct.name} Product is already exist!`,
            status: 409,
          },
        };
      }
    }

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

    const imageUrl = data.img
      ? await uploadImage({
          authCookie: await getSessionCookieString(),
          imageFile: data.img,
          pathname: `product_images/${productFromDb.id}`,
        })
      : productFromDb.image;

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
        image: imageUrl,
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
      status: "success",

      message: `${data.name} updated successfully`,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && productImg) {
      await deleteImageFromBucket(extractPublicIdFromUrl(productImg));
    }
    console.error(error);

    return {
      status: "error",
      error: {
        message: "An Error Occurred",
        status: 500,
      },
    };
  }
}
