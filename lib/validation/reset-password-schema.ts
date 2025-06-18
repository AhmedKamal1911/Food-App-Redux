import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string({ message: "token must be string!" }),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one digit.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character."
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match.",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
