import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string({
        message: "First Name is Requierd",
      })
      .min(2, {
        message: "Username must be at least 2 characters.",
      }),
    lastName: z
      .string({
        message: "Last Name is Requierd",
      })
      .min(2, {
        message: "Username must be at least 2 characters.",
      }),
    email: z.string().email({ message: "Invalid Email" }),
    phone: z.string({
      message: "Phone Number is Requierd",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one digit.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
// TODO: password valiation
