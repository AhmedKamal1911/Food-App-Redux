"use client";

import { FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { CartProduct } from "@/lib/types/product";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPaymentIntent } from "@/hooks/use-get-payment-intent";

import { useStripePayment } from "@/hooks/use-stripe-payment";
import { getBaseUrl } from "@/lib/utils";
import { useSession } from "next-auth/react";
export type PaymentMetadata = {
  userId: string;
  products: {
    id: string;
    qty: number;
    sizeId: string | undefined;
    extras: { id: string }[];
  }[];
}; // JSON string of products
export function CheckoutForm({
  cartProducts,
  subtotal,
}: {
  cartProducts: CartProduct[];
  subtotal: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();

  const metadata = {
    userId: session.data?.user.id ?? null,
    products: JSON.stringify(
      cartProducts.map((p) => ({
        id: p.id,
        qty: p.qty,
        sizeId: p.selectedSize?.id,
        extras: p.selectedExtras.map((ex) => ({ id: ex.id })),
      }))
    ),
  };

  const { data, paymentIntentError, paymentIntentSecretLoading, refetch } =
    useGetPaymentIntent(
      { subtotal, metadata: metadata },
      session.status !== "loading"
    );

  const { confirmPayment, isLoading, message } = useStripePayment();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !data?.clientSecret) {
      return;
    }
    const success = await confirmPayment(
      data.clientSecret,
      `${getBaseUrl()}/success`
    );
    if (!success) return;
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
          layout: "tabs",
        }}
      />
      <LinkAuthenticationElement
        options={{
          defaultValues: {
            email: session.data?.user.email || "",
          },
        }}
      />
      <AddressElement
        options={{
          mode: "shipping",
          fields: {
            phone: "always",
          },
          validation: {
            phone: { required: "always" },
          },
          defaultValues: {
            name: session.data?.user.name || "",
          },
        }}
      />
      <Button
        className="capitalize font-bold rounded-sm w-full text-xl h-auto"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin  size-8 text-white" />
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
