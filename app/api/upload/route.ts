import cloudinary from "@/lib/cloudinary";
import {
  FileUploadResponseSchema,
  fileUploadSchema,
} from "@/lib/validation/file-upload-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const result = fileUploadSchema.safeParse({
    file: formData.get("file"),
    pathname: formData.get("pathname"),
  });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400, statusText: "Bad Request" }
    );
  }

  const { pathname, file } = result.data;
  const imageName = pathname.split("/")[1];
  try {
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      {
        folder: pathname,
        public_id: imageName, // Use the image name from the pathname
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
