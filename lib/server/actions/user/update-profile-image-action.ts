"use server";

import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/queries/upload/upload-image";
import { ActionResponse } from "@/lib/types/shared";
import { profileImageSchema } from "@/lib/validation/profile-image-schema";

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
    const imageUrl = await uploadImage({
      imageFile: schemaParseResult.data,
      pathname: `profile_images/${session.user.id}`,
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: imageUrl,
      },
    });

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
