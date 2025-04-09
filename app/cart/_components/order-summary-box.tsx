import { Button } from "@/components/ui/button";

import Link from "next/link";
import { PromoCodeForm } from "./promo-code-form";

export default function OrderSummaryBox({
  subtotal,
  itemsCount,
}: {
  subtotal: number;
  itemsCount: number;
}) {
  return (
    <div className="lg:sticky lg:top-20 lg:w-[25%] bg-secondary/5 px-3 xl:px-6 py-15 flex flex-col lg:self-start">
      <span className="text-2xl capitalize">order summary</span>

      <div className="flex flex-col gap-10 py-5 my-5 border-y-2 flex-1">
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
      <div className="flex flex-col gap-5">
        <div className="flex justify-between font-semibold">
          <span className="uppercase">total cost</span>
          <span>${subtotal - 20}</span>
        </div>
        <Button asChild className="w-full text-xl uppercase rounded-none py-6">
          <Link href="/checkout">check out</Link>
        </Button>
      </div>
    </div>
  );
}
