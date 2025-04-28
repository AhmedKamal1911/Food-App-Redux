import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category Name Must be at least 2 character(s)" })
    .max(50, { message: "Category Name Must be at most 50 character(s)" }),
  img: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, {
      message: "Category Image is required",
    })
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
    }),
});

export type CreateCategoryInputs = z.infer<typeof createCategorySchema>;
