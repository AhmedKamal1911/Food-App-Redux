import { z } from "zod";
import { PRODUCT_SIZES } from "../data";

export const updateProductSchema = z.object({
  id: z.string({ message: "product id must be a string" }),
  name: z.string().min(2).max(50),
  desc: z
    .string()
    .min(10, { message: "Desc Must be at least 10 char" })
    .max(500, { message: "Desc Must be at most 500 char" }),
  price: z
    .number({ coerce: true })
    .min(0, { message: "price must be at least 0" }),
  categoryId: z.string().uuid({ message: "Invalid category ID" }),
  sizes: z.array(
    z.object({
      id: z.string({ message: "size id must be a string" }).optional(),
      name: z.enum(PRODUCT_SIZES, {
        message: "Size is required",
      }),
      price: z.number().min(1, "Price must be at least 1 dollar"),
    })
  ),
  extras: z.array(
    z.object({
      id: z.string({ message: "Extra id must be a string" }).optional(),
      name: z.string({
        message: "Extra is required",
      }),
      price: z.number().min(1, "Price must be at least 1 dollar"),
    })
  ),
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

export type UpdateProductInputs = z.infer<typeof updateProductSchema>;
