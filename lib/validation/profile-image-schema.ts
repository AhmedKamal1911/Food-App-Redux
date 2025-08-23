import { z } from "zod";

export const profileImageSchema = z
  .instanceof(File, { message: "Image Is Required" })
  .refine((file) => file.type.startsWith("image/"), {
    message: "File Must Be An Image",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Image Size Must Be Less Than 5MB",
  });
