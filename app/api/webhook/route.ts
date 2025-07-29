import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { PaymentMetadata } from "@/app/(main)/cart/_components/forms/checkout-form";
import { getProductsByIds } from "@/lib/queries/product/get-products-by-ids";
import prisma from "@/lib/prisma";
import { Extra, Size } from "@prisma/client";
import { Resend } from "resend";
import { OrderSuccessTemplate } from "@/emails/order-success-template";
import { OrderCancelTemplate } from "@/emails/order-cancel-template";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Error constructing webhook event:", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
  const session = event.data.object as Stripe.Charge;

  const metadata = session.metadata;
  const paymentId = session.payment_intent as string | undefined;
  const totalAmount = session.amount;
  if (!metadata || !metadata.products || !paymentId) {
    // handle error
    return NextResponse.json({ error: "No metadata found" }, { status: 400 });
  }
  const userId = metadata.userId as string | null;
  const billing_details = session.billing_details;

  switch (event.type) {
    case "charge.succeeded":
      // Create order only if it doesn't exist

      const existingOrder = await prisma.order.findUnique({
        where: { paymentId },
      });
      if (existingOrder) {
        // console.log("Order already exists for paymentId:", paymentId);
        return NextResponse.json(
          { error: `Order already exists for paymentId:${paymentId}` },
          { status: 400 }
        );
      }
      const paymentProducts: PaymentMetadata["products"] = JSON.parse(
        metadata.products
      );
      const paymentProductsIds = paymentProducts.map((p) => p.id).join(",");
      // 1. Fetch all products from DB
      const dbProducts = await getProductsByIds(paymentProductsIds); // returns array of products

      // 2. Build order items array
      const orderItems = paymentProducts
        .map((orderProduct) => {
          const product = dbProducts.data.find((p) => p.id === orderProduct.id);
          if (!product) return null;
          return {
            productId: product.id,
            qty: orderProduct.qty,
            selectedSize: product.sizes.find(
              (s) => s.id === orderProduct.sizeId
            ),
            selectedExtras: product.extras.filter((ex) =>
              orderProduct.extras.some((userEx) => userEx.id === ex.id)
            ),
          };
        })
        .filter(
          (
            item
          ): item is {
            productId: string;
            qty: number;
            selectedSize: Size | undefined;
            selectedExtras: Extra[];
          } => item !== null
        );

      await prisma.order.create({
        data: {
          paymentId: paymentId,
          userId: userId,
          total: totalAmount ?? 0 / 100,
          status: "pending",
          items: {
            create: orderItems.map((item) => ({
              qty: item.qty,
              selectedSize: item.selectedSize
                ? { connect: { id: item.selectedSize.id } }
                : undefined,
              product: {
                connect: { id: item.productId },
              },
              selectedExtras: {
                connect: item.selectedExtras.map((ex) => ({
                  id: ex.id,
                })),
              },
            })),
          },
        },
      });

      await resend.emails.send({
        from: "Pizzon <onboarding@resend.dev>",
        to: billing_details.email!,
        subject: "Your Order Confirmation",
        react: OrderSuccessTemplate({
          name: billing_details.name!,
          totalAmount: totalAmount,
          currency: session.currency,
          receiptUrl: session.receipt_url!,
          isRegistered: Boolean(userId),
        }),
      });
      // console.log("Order processing ");
      break;
    case "charge.refunded":
      await prisma.order.update({
        where: {
          paymentId: paymentId,
        },
        data: {
          status: "canceled",
        },
      });

      await resend.emails.send({
        from: "Pizzon <onboarding@resend.dev>",
        to: billing_details.email!,
        subject: "Your Order Canceled",
        react: OrderCancelTemplate({
          name: billing_details.name!,
          totalAmount: totalAmount,
          currency: session.currency,
        }),
      });

      break;
    default:
      // console.warn(`Unhandled event type: ${event.type}`);
      return NextResponse.json(
        { error: "Unhandled event type" },
        { status: 400 }
      );
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
