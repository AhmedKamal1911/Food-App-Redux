import { useAppSelector } from "@/lib/redux/hooks";
import { useMemo } from "react";

export function useCartProductsCount() {
  const p = useAppSelector((state) => state.cart.products);
  const products = Object.values(p);
  const itemsCount = useMemo(() => {
    return products.reduce((acc, curr) => acc + curr.length, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);
  return itemsCount;
}
