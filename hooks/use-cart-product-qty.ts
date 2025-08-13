import { useAppSelector } from "@/lib/redux/hooks";
import { useMemo } from "react";

export function useCartProductQty(productId: string) {
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalQuantity = useMemo(() => {
    return (
      cartProducts[productId]?.reduce((acc, curr) => acc + curr.qty, 0) ?? 0
    );
  }, [cartProducts, productId]);

  return totalQuantity;
}
