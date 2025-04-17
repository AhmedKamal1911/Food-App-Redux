"use client";

import { useGetCartProducts } from "@/hooks/use-get-cart-products";
import OrderSummaryBox from "./order-summary-box";
import ShoppingCart from "./shopping-cart";
import { useCartProductsSubtotal } from "@/hooks/use-cart-products-subtotal";

import { useCartProductsCount } from "@/hooks/use-cart-products-count";

export default function CartSectionWrapper() {
  // TODO:create hook to get cart products and another one to get subtotal
  const { cartProducts, error, isRefetching, isLoading, refetch } =
    useGetCartProducts();
  const itemsCount = useCartProductsCount();

  const cartProductsSubtotal = useCartProductsSubtotal(cartProducts);
  console.log({ itemsCount });
  return (
    <section className="flex max-lg:flex-col min-h-[80vh]">
      <ShoppingCart
        products={cartProducts}
        itemsCount={itemsCount}
        error={error}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetchCartProducts={refetch}
      />
      <OrderSummaryBox
        subtotal={cartProductsSubtotal}
        itemsCount={itemsCount}
      />
    </section>
  );
}
