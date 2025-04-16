import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),

  password: z
    .string({ message: "Password is Requierd" })
    .min(8, { message: "Password is Requierd" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
