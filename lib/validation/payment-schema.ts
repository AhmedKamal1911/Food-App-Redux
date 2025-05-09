import { z } from "zod";
export const createPaymentIntentResponseSchema = z.object({
  clientSecret: z.string().nullable(),
});
