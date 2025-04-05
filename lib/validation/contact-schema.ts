import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  message: z.string().min(1, { message: "Message is required" }).max(500, {
    message: "Message must be less than 500 characters",
  }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
