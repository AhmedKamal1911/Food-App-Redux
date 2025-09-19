import { fileUploadResponseSchema } from "@/lib/validation/file-upload-schema";

export async function uploadImage({
  imageFile,
  pathname,
  authCookie,
}: {
  imageFile: File;
  pathname: string;
  authCookie?: string;
}) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathname", pathname);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
        headers: authCookie
          ? {
              Cookie: authCookie,
            }
          : undefined,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to upload image");
    }

    const data = fileUploadResponseSchema.parse(await response.json());
    return data.url;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to upload image");
  }
}
