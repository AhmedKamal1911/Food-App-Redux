import { z } from "zod";
import { PRODUCT_SIZES } from "../data";
// name: $Enums.SizeEnum;
// price: number;
// id: string;
// updatedAt: Date;
// createdAt: Date;
// productId: string;
export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product Name Must be at least 2 character(s)" })
    .max(50, { message: "Product Name Must be at most 50 character(s)" }),
  desc: z
    .string()
    .min(10, { message: "Desc Must be at least 10 char" })
    .max(500, { message: "Desc Must be at most 500 char" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "price must be at least 0" })
  ),
  categoryId: z.string().uuid({ message: "Category Is Requierd" }),
  sizes: z
    .array(
      z.object({
        name: z.enum(PRODUCT_SIZES, {
          message: "Size is required",
        }),
        price: z.number().min(0, "Price is required"),
      })
    )
    .min(1, "At least one size is required"),
  img: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size > 0, {
      message: "Product Image is required",
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

export type CreateProductSchema = z.infer<typeof createProductSchema>;
