import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";
import { createPaymentIntentResponseSchema } from "@/lib/validation/payment-schema";

const reqBodySchema = z.object({
  amount: z
    .number({ coerce: true })
    .positive({ message: "Amount number must be positive number!" }),
  metadata: z.record(z.any()),
});

type Response = z.infer<typeof createPaymentIntentResponseSchema>;
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = reqBodySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.formErrors.fieldErrors },
        { status: 400, statusText: "Bad Request" }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: result.data.amount,

      currency: "eur",
      metadata: result.data.metadata,
    });

    return NextResponse.json<Response>({
      clientSecret: paymentIntent.client_secret,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
