import { fileUploadResponseSchema } from "@/lib/validation/file-upload-schema";

export async function uploadProfileImage(imageFile: File) {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/profile-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData: { error: string } = await response.json();
    throw new Error(errorData.error);
  }

  const data = fileUploadResponseSchema.parse(await response.json());
  return data;
}

//  return {
//       error:
//         error instanceof TypeError
//           ? "Failed To Upload : Check Your Network Connection!"
//           : error instanceof Error
//             ? error.message
//             : "Failed to upload image",
//     };
