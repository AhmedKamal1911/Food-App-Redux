import { z } from "zod";

export const updateCategorySchema = z.object({
  id: z.string({ message: "category id must be a string" }),
  name: z.string().min(2).max(50),
  img: z
    .instanceof(File, { message: "File is required" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only JPG, PNG, or WEBP files are allowed",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .optional(),
});

export type UpdateCategoryInputs = z.infer<typeof updateCategorySchema>;
