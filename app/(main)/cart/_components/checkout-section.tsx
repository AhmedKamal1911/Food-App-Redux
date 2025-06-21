import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./forms/checkout-form";
import { PromoCodeForm } from "./forms/promo-code-form";
import { loadStripe } from "@stripe/stripe-js";
import { CartProduct } from "@/lib/types/product";
import { AuthSessionProvider } from "@/providers/next-auth-session-provider";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function CheckoutSection({
  subtotal,
  itemsCount,
  cartProducts,
}: {
  subtotal: number;
  itemsCount: number;
  cartProducts: CartProduct[];
}) {
  console.log({ amount: Math.trunc(subtotal) * 100 });
  return (
    <div className="lg:sticky lg:top-20 lg:w-[25%] bg-secondary/5 px-3 xl:px-6 py-15 flex flex-col lg:self-start divide-y-2 gap-5">
      <span className="text-2xl capitalize pb-2">order summary</span>
      <PromoCodeBox itemsCount={itemsCount} subtotal={subtotal} />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between font-semibold">
          <span className="uppercase">total cost</span>
          <span>${subtotal - 20}</span>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            appearance: {
              theme: "stripe",
            },
            mode: "payment",
            amount: Math.trunc(subtotal) * 100,
            currency: "eur",
          }}
        >
          <AuthSessionProvider>
            <CheckoutForm cartProducts={cartProducts} subtotal={subtotal} />
          </AuthSessionProvider>
        </Elements>
      </div>
    </div>
  );
}

function PromoCodeBox({
  itemsCount,
  subtotal,
}: {
  itemsCount: number;
  subtotal: number;
}) {
  return (
    <div className="flex flex-col gap-10 py-5">
      <div className="flex justify-between">
        <span className="text-xl font-semibold uppercase">
          Items {itemsCount}
        </span>
        <span className="font-semibold">${subtotal}</span>
      </div>
      <div>
        <span className="block uppercase text-xl mb-5">
          Promo Code / Coupon
        </span>
        <PromoCodeForm />
      </div>
    </div>
  );
}
