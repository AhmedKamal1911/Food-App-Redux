import { z } from "zod";

export const bookTableSchema = z.object({
  name: z
    .string({ required_error: "Please Enter Your Name" })
    .min(1, { message: "Name Is Requierd" }),
  email: z.string().email(),
  numberOfCustomers: z.string({
    required_error: "Please Enter Number of People",
  }),
  bookingDate: z.date(),
});

export type BookTableSchema = z.infer<typeof bookTableSchema>;
