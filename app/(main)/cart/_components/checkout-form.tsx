"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CartProduct } from "@/lib/types/product";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPaymentIntent } from "@/hooks/use-get-payment-intent";
import { useSession } from "next-auth/react";

export function CheckoutForm({
  cartProducts,
  subtotal,
}: {
  cartProducts: CartProduct[];
  subtotal: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const metadata = {
    userId: session?.user.id || "guest",
    products: JSON.stringify(
      cartProducts.map((p) => ({
        id: p.id,
        qty: p.qty,
        sizeId: p.selectedSize?.id,
        extras: p.selectedExtras.map((ex) => ({ id: ex.id })),
      }))
    ),
  };
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, paymentIntentError, paymentIntentSecretLoading, refetch } =
    useGetPaymentIntent({ subtotal, metadata: metadata });

  console.log({ data, session });
  // TODO: put this logic in hook to separation of concerns
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !data?.clientSecret) {
      return;
    }

    const { error: validationErrors } = await elements.submit();
    if (validationErrors) return;
    setIsLoading(true);
    console.log(data.clientSecret);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
      clientSecret: data.clientSecret,
    });

    // Use type guard to ensure error is of type StripeError
    if (error) {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  if (paymentIntentSecretLoading || paymentIntentError) {
    return (
      <div className="flex justify-center items-center bg-white rounded-sm min-h-[200px] ">
        {paymentIntentSecretLoading && (
          <LoaderCircle className="animate-spin text-primary size-8" />
        )}
        {paymentIntentError && (
          <div className="flex flex-col gap-2 ">
            <span className="capitalize">failed to load payment form </span>
            <Button
              onClick={() => refetch()}
              variant={"destructive"}
              className="capitalize font-bold "
            >
              retry
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <PaymentElement
        id="payment-element"
        options={{
          layout: "auto",
        }}
      />
      <Button
        className="capitalize font-bold rounded-sm w-full text-xl h-auto"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin text-primary size-8" />
        ) : (
          "pay"
        )}
      </Button>
      {/* Show any error or success messages */}
      {message && (
        <span className="block text-destructive capitalize">{message}</span>
      )}
    </form>
  );
}
