"use server";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { deleteImageFromBucket } from "@/lib/server-utils";

import { ActionResponse } from "@/lib/types/shared";
import { extractPublicIdFromUrl } from "@/lib/utils";
import { Prisma } from "@prisma/client";

import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function updateProfileImageAction(
  profileImgURL: string
): ActionResponse {
  const session = await getCurrentSession();
  if (!session) {
    return {
      status: "error",
      error: {
        status: 401,
        message: "Unathorized action!",
      },
    };
  }
  const schemaParseResult = z
    .string({ required_error: "profile image url must be string" })
    .safeParse(profileImgURL);

  if (!schemaParseResult.success) {
    return {
      status: "validationError",
      error: {
        status: 400,
        message: schemaParseResult.error.flatten().formErrors[0],
      },
    };
  }

  try {
    // TODO: if database update failed remove the image from bucket
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: schemaParseResult.data,
      },
    });
    revalidateTag(PRISMA_CACHE_KEY.USERS);
    revalidateTag(`${PRISMA_CACHE_KEY.USERS}-${session.user.id}`);
    return {
      status: "success",
      message: "Profile Image Updated Successfully.",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      await deleteImageFromBucket(extractPublicIdFromUrl(profileImgURL));
    }
    console.error(error);
    return {
      status: "error",
      error: {
        status: 500,
        message: "Internal Server Error!",
      },
    };
  }
}
