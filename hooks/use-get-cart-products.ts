import { getProductsByIds } from "@/lib/queries/product/get-products-by-ids";
import { useAppSelector } from "@/lib/redux/hooks";
import { CartProduct } from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useGetCartProducts() {
  const cartItems = useAppSelector((state) => state.cart.products);
  const productsIdsString = Object.keys(cartItems).toString();
  const { data, ...query } = useQuery({
    queryKey: ["cart", productsIdsString],
    queryFn: () => getProductsByIds(productsIdsString),
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });

  const cartProducts = useMemo(() => {
    const list: CartProduct[] = [];
    if (data === undefined) return list;

    Object.entries(cartItems).forEach(([id, options]) => {
      const cartProduct = data.data.find((p) => p.id === id)!;
      // FIXME: think about if product not in db and in redux;
      const sameProductList = options.map<CartProduct>((op) => {
        const selectedSize = cartProduct.sizes.find((s) => s.id === op.sizeId)!;
        const selectedExtras = cartProduct.extras.filter((ext) =>
          op.extrasIds.includes(ext.id)
        )!;
        return {
          ...cartProduct,
          qty: op.qty,
          selectedSize,
          selectedExtras,
        };
      });

      list.push(...sameProductList);
    });

    return list;
  }, [cartItems, data]);

  console.log(cartProducts);

  return { cartProducts, ...query };
}
