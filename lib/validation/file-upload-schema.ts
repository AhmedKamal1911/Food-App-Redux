import { z } from "zod";

export const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    }),
  pathname: z.string().min(1, { message: "Pathname is required" }),
});

export const fileUploadResponseSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }),
});

export type FileUploadResponseSchema = z.infer<typeof fileUploadResponseSchema>;
