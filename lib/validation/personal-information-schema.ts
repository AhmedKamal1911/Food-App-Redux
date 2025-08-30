import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z
    .string({
      required_error: "Current password is required",
    })
    .min(1, {
      message: "Current password is required",
    }),

  phoneNumber: z.string({
    required_error: "Please confirm your new password",
  }),
  email: z.string().email({ message: "Invalid Email" }),
});

export type PersonalInformationInputs = z.infer<
  typeof personalInformationSchema
>;
