import "server-only";
import { getSessionCookieString } from "@/lib/server-utils";
import { fileUploadResponseSchema } from "@/lib/validation/file-upload-schema";

export async function uploadProfileImage(imageFile: File) {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/profile-image`,
    {
      method: "POST",
      body: formData,
      headers: {
        Cookie: await getSessionCookieString(), // Include your cookie(s) here
        // REMEMBER: cookies are not sent auto with request when the request is from server to server.
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log({ errorData });
    throw new Error(errorData.error || "Failed to upload image");
  }

  const data = fileUploadResponseSchema.parse(await response.json());
  return data.url;
}
