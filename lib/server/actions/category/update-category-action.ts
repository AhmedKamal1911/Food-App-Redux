"use server";

import slugify from "slugify";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { updateCategorySchema } from "@/lib/validation/update-category-schema";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCategoryById, getCategoryBySlug } from "../../queries";
import { deleteImageFromBucket, requirePermission } from "@/lib/server-utils";

import { ActionResponse } from "@/lib/types/shared";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { extractPublicIdFromUrl } from "@/lib/utils";
const schema = updateCategorySchema
  .omit({ img: true })
  .merge(z.object({ imgUrl: z.string().optional() }));
type Inputs = z.infer<typeof schema>;
export async function updateCategoryAction(inputs: Inputs): ActionResponse {
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
  const result = schema.safeParse(inputs);
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
    // Update Category
    await prisma.productCategory.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: newCategorySlug,
        image: data.imgUrl ?? categoryFromDb.image,
      },
    });

    revalidateTag(PRISMA_CACHE_KEY.CATEGORIES);

    return {
      status: "success",

      message: `Category "${data.name}" updated successfully.`,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      inputs.imgUrl
    ) {
      await deleteImageFromBucket(extractPublicIdFromUrl(inputs.imgUrl));
    }
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
