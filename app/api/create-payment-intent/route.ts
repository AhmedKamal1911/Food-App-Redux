import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";
import { createPaymentIntentResponseSchema } from "@/lib/validation/payment-schema";

const reqBodySchema = z.object({
  amount: z
    .number({ coerce: true })
    .positive({ message: "Amount number must be positive number!" }),
  metadata: z.string({ message: "metadata must be sended as string" }),
});

type Response = z.infer<typeof createPaymentIntentResponseSchema>;
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = reqBodySchema.safeParse(body);
    console.log({ d: body.metadata });
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.formErrors.fieldErrors },
        { status: 400, statusText: "Bad Request" }
      );
    }
    console.log({ amount: result.data.amount });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: result.data.amount,
      currency: "eur",
      metadata: JSON.parse(result.data.metadata),
    });

    return NextResponse.json<Response>({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
