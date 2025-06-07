import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Current password is required",
      })
      .min(1, {
        message: "Current password is required",
      }),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string({
      required_error: "Please confirm your new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordInputs = z.infer<typeof changePasswordSchema>;
