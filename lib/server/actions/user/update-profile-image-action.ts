"use server";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";

import { uploadProfileImage } from "@/lib/server/queries/upload/upload-profile-image";
import { ActionResponse } from "@/lib/types/shared";
import { profileImageSchema } from "@/lib/validation/profile-image-schema";
import { revalidateTag } from "next/cache";

export async function updateProfileImageAction(
  prevState: unknown,
  formData: FormData
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
  const imageFile = formData.get("profileImage");
  const schemaParseResult = profileImageSchema.safeParse(imageFile);

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
    const imageUrl = await uploadProfileImage(schemaParseResult.data);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: imageUrl,
      },
    });
    revalidateTag(PRISMA_CACHE_KEY.USERS);
    revalidateTag(`${PRISMA_CACHE_KEY.USERS}-${session.user.id}`);
    return {
      status: "success",
      message: "Profile Image Updated Successfully.",
    };
  } catch (error) {
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
