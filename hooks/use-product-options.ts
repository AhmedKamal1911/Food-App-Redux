import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useProductTotalPrice } from "@/hooks/use-product-total-price";
import { ProductWithRelations } from "@/lib/types/product";
import { Extra, Size } from "@prisma/client";

type SelectedOptionsState = {
  size: Size | undefined;
  extras: Extra[];
};

export function useProductOptions(product: ProductWithRelations) {
  const dispatch = useAppDispatch();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>(
    () => ({
      size:
        product.sizes.find(({ name }) => name === "XSmall") ??
        product.sizes?.[0],
      extras: [],
    })
  );

  const totalProductPrice = useProductTotalPrice({
    productPrice: product.price,
    selectedExtras: selectedOptions.extras,
    selectedSize: selectedOptions.size,
  });

  const selectedOptionsUpdater = (o: Partial<SelectedOptionsState>) => {
    setSelectedOptions((prev) => ({ ...prev, ...o }));
  };

  function addProductToCart() {
    dispatch(
      addToCart({
        id: product.id,
        sizeId: selectedOptions?.size?.id,
        extrasIds: selectedOptions.extras.map((extra) => extra.id),
      })
    );
    toast.success(`${product.name} Added To Cart`);
  }

  return {
    selectedOptions,
    selectedOptionsUpdater,
    totalProductPrice,
    addProductToCart,
  };
}
