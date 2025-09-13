import cloudinary from "@/lib/cloudinary";
import { getCurrentSession } from "@/lib/dal/user";

import { FileUploadResponseSchema } from "@/lib/validation/file-upload-schema";
import { profileImageSchema } from "@/lib/validation/profile-image-schema";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getCurrentSession();
  console.dir({ session }, { depth: null });
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized User!" },
      { status: 403, statusText: "Unauthorized" }
    );
  }
  const formData = await request.formData();

  const result = profileImageSchema.safeParse(formData.get("file"));

  // TODO: rate limiting
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400, statusText: "Bad Request" }
    );
  }

  const file = result.data;

  try {
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: "profile_images",
        public_id: session.user.id,

        resource_type: "auto",
        overwrite: true,
      }
    );

    return NextResponse.json<FileUploadResponseSchema>(
      { url: uploadResponse.secure_url },
      {
        status: 200,
        statusText: "File uploaded successfully",
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
