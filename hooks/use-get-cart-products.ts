import { getProductsByIds } from "@/lib/queries/product/get-products-by-ids";
import { useAppSelector } from "@/lib/redux/hooks";
import { CartProduct } from "@/lib/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { TanstackQueryCacheKey } from "@/lib/cache/cache-keys";
import { usePrevious } from "./use-prev";

export function useGetCartProducts() {
  const cartItems = useAppSelector((state) => state.cart.products);
  const productsIdsString = Object.keys(cartItems).toString();
  const cartProductsLength = Object.values(cartItems).length;

  const prevCartItemsLength = usePrevious(cartProductsLength);
  const { data, ...query } = useQuery({
    queryKey: [TanstackQueryCacheKey.CART],
    queryFn: () => getProductsByIds(productsIdsString),
    enabled: productsIdsString !== "",
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });
  const client = useQueryClient();
  useEffect(() => {
    if (prevCartItemsLength && prevCartItemsLength < cartProductsLength) {
      client.invalidateQueries({ queryKey: [TanstackQueryCacheKey.CART] });
    }
    if (prevCartItemsLength === 0 && cartProductsLength === 0) {
      client.removeQueries({ queryKey: [TanstackQueryCacheKey.CART] });
    }
  }, [cartProductsLength, client, prevCartItemsLength]);

  const cartProducts = useMemo(() => {
    const list: CartProduct[] = [];
    // if (cartProductsLength !== data?.data.length) return list;
    if (data === undefined || data.data.length === 0) return list;
    Object.entries(cartItems).forEach(([id, options]) => {
      const cartProduct = data.data.find((p) => p.id === id)!;

      if (!cartProduct) return; // skip if product not found in DB
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

  return { cartProducts, ...query };
}

// if previous cartItemsLength < current cartItemsLength
// that means there is new cart item added
// then => tell react query to invalidate cart query
// (force react query to fetch the cart items again)
