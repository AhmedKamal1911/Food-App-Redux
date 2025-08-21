import { z } from "zod";

const phoneNumberRegex =
  /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,5}\)?[\s-]?)?[\d\s-]{5,}$/;

const phoneNumberSchema = z
  .string({ required_error: "Please Enter Your Phone Number" })
  .trim()
  .regex(phoneNumberRegex, { message: "Invalid phone number format" })
  .min(10, { message: "Phone number is too short" })
  .max(20, { message: "Phone number is too long" });

export const reservationSchema = z.object({
  name: z.string({ required_error: "Please Enter Your Name" }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Email is Requierd" }),
  numberOfCustomers: z.string().refine(
    (data) => {
      console.log("data", data);
      return data !== "empty";
    },
    {
      message: "Please Select Number Of Customers",
    }
  ),
  bookingDate: z.date(),
  phoneNumber: phoneNumberSchema,
  comments: z
    .string()
    .max(300, { message: "message must be less than 300 characters" })
    .optional(),
});

export type ReservationSchema = z.infer<typeof reservationSchema>;
