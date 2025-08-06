import { CartProduct } from "@/lib/types/product";
import { calcProductTotalPrice } from "@/lib/utils";
import { useMemo } from "react";

export function useCartProductsSubtotal(cartProducts: CartProduct[]) {
  return useMemo(() => calcCartProductsSubtotal(cartProducts), [cartProducts]);
}

function calcCartProductsSubtotal(cartProducts: CartProduct[]) {
  return Number(
    cartProducts
      .reduce(
        (acc, curr) =>
          acc +
          calcProductTotalPrice({
            extras: curr.selectedExtras,
            productPrice: curr.price,
            size: curr.selectedSize,
            qty: curr.qty,
          }),
        0
      )
      .toFixed(2)
  );
}
