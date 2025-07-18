import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { searchParams: Promise<{ payment_intent?: string }> };

export default async function Success({ searchParams }: Props) {
  const { payment_intent } = await searchParams;

  if (!payment_intent) throw new Error("Missing payment_intent id");

  // Step 1: Get the PaymentIntent
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  // Step 2: Get the latest charge ID
  const chargeId = paymentIntent.latest_charge;
  if (!chargeId) throw new Error("No charge found for this PaymentIntent");

  // Step 3: Retrieve the full Charge object
  const charge = await stripe.charges.retrieve(chargeId as string);

  // Step 4: Extract values
  const amount = (paymentIntent.amount_received / 100).toFixed(2);
  const currency = paymentIntent.currency.toUpperCase();
  const { email, name, phone } = charge.billing_details;
  const { shipping, receipt_url } = charge;

  return (
    <main className="min-h-screen pb-5 pt-30 bg-secondary flex flex-col items-center justify-center text-center px-4">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <Image
              src="/images/decorations/success.png"
              height={400}
              width={400}
              alt="success"
            />
            <Image
              src="/images/decorations/alien-ship.png"
              height={100}
              width={100}
              alt="alien ship"
              className="absolute end-0 bottom-full "
            />
          </div>

          <p className="uppercase text-3xl sm:text-4xl text-white font-bold">
            we will go over your order soon
          </p>

          <div className="bg-white/90 rounded-3xl w-full max-w-md p-4 flex flex-col gap-1 items-center shadow-lg text-sm sm:text-base ">
            <div className="w-full">
              <p className="font-semibold text-lg mb-1">Payment Details</p>
              <div className="flex justify-between items-center">
                <span>Amount:</span>
                <span className="font-bold">
                  {amount} {currency}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className="capitalize font-bold text-green-600">
                  {paymentIntent.status}
                </span>
              </div>
              {receipt_url && (
                <div className="flex justify-between items-center">
                  <span>Receipt:</span>
                  <Link
                    href={receipt_url}
                    target="_blank"
                    className="text-blue-600 underline font-medium"
                  >
                    View Receipt
                  </Link>
                </div>
              )}
            </div>

            <div className="w-full border-t pt-4">
              <p className="font-semibold text-lg mb-1">Billing Info</p>
              <div className="flex justify-between items-center">
                <span>Name:</span>
                <span>{name || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Email:</span>
                <span>{email || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Phone:</span>
                <span>{phone || "N/A"}</span>
              </div>
            </div>

            {shipping?.address && (
              <div className="w-full border-t pt-4">
                <p className="font-semibold text-lg mb-1">Shipping Info</p>
                <div className="flex justify-between items-center">
                  <span>Name:</span>
                  <span>{shipping.name || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Phone:</span>
                  <span>{shipping.phone || "N/A"}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span>Address:</span>
                  <span className="text-right text-sm max-sm:text-[16px]">
                    {[
                      shipping.address.line1,

                      shipping.address.city,
                      shipping.address.state,

                      shipping.address.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Button
            asChild
            className="rounded-3xl hover:bg-white hover:text-primary p-7 text-2xl sm:text-3xl"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
