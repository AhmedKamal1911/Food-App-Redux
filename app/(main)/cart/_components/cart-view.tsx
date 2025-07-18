"use client";

import { useGetCartProducts } from "@/hooks/use-get-cart-products";

import ShoppingCart from "./shopping-cart";
import { useCartProductsSubtotal } from "@/hooks/use-cart-products-subtotal";

import { useCartProductsCount } from "@/hooks/use-cart-products-count";
import CheckoutSection from "./checkout-section";

export default function CartView() {
  const { cartProducts, error, isRefetching, isLoading, refetch } =
    useGetCartProducts();
  const itemsCount = useCartProductsCount();

  const cartProductsSubtotal = useCartProductsSubtotal(cartProducts);

  return (
    <section className="flex max-lg:flex-col min-h-screen">
      <ShoppingCart
        products={cartProducts}
        itemsCount={itemsCount}
        error={error}
        isLoading={isLoading}
        isRefetching={isRefetching}
        refetchCartProducts={refetch}
      />
      {cartProductsSubtotal > 0 && (
        <CheckoutSection
          subtotal={cartProductsSubtotal}
          cartProducts={cartProducts}
          itemsCount={itemsCount}
        />
      )}
    </section>
  );
}
