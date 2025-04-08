import { calcProductTotalPrice } from "@/lib/utils";
import { Extra, Size } from "@prisma/client";
import { useMemo } from "react";

type UseProductTotalPriceArgs = {
  productPrice: number;
  selectedSize: Size;
  selectedExtras: Extra[];
  qty?: number;
};
export function useProductTotalPrice({
  selectedExtras,
  productPrice,
  selectedSize,
  qty = 1,
}: UseProductTotalPriceArgs) {
  return useMemo(
    () =>
      calcProductTotalPrice({
        productPrice: productPrice,
        extras: selectedExtras,
        size: selectedSize,
        qty,
      }),
    [productPrice, qty, selectedExtras, selectedSize]
  );
}
