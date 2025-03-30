"use client";
import ProductCard from "@/components/common/product-card";
import { useAppSelector } from "@/lib/redux/hooks";
import { ProductWithRelations } from "@/lib/types/product";

export default function CategoryProductsGridContainer({
  categoryProducts,
}: {
  categoryProducts: ProductWithRelations[];
}) {
  const cartProducts = useAppSelector((state) => state.cart.products);

  return (
    <>
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-3  gap-7 ">
          {categoryProducts.map((product) => {
            const totalQuantity =
              cartProducts[product.id]?.reduce(
                (acc, curr) => acc + curr.qty,
                0
              ) ?? 0;

            return (
              <ProductCard
                key={product.id}
                product={product}
                productQty={totalQuantity}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold">No Products Found</p>
      )}
    </>
  );
}
