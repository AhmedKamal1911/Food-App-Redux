import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),

  password: z
    .string({ message: "Password is Requierd" })
    .min(8, { message: "Password is Requierd" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginErrorSchema = z.object({
  status: z.union([z.literal("error"), z.literal("validationError")]),
  error: z.object({
    status: z.number(),
    message: z.string(),
  }),
});
