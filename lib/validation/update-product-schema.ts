import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(2).max(50),
  desc: z
    .string()
    .min(10, { message: "Desc Must be at least 10 char" })
    .max(500, { message: "Desc Must be at most 500 char" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "price must be at least 0" })
  ),
  categoryId: z.string().uuid({ message: "Invalid category ID" }),
  // sizes: z.array(z.object({})),
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

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
