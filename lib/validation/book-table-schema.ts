import { z } from "zod";

export const bookTableSchema = z.object({
  name: z
    .string({ required_error: "Please Enter Your Name" })
    .min(1, { message: "Name Is Requierd" }),
  email: z.string().email({ message: "Email is Requierd" }),
  numberOfCustomers: z.string().refine((data) => data !== "empty", {
    message: "Please Select Number Of Customers",
  }),
  bookingDate: z.date(),
});

export type BookTableSchema = z.infer<typeof bookTableSchema>;
