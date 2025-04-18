"use client";

import ProductCard from "@/components/common/product-card";

import { useAppSelector } from "@/lib/redux/hooks";

import Pagination from "./pagination";
import { CategoryWithPaginatedProducts } from "@/lib/types/category";

type Props = {
  categoryData: CategoryWithPaginatedProducts;
  query?: string;
};
export default function ProductsViewer({ categoryData, query }: Props) {
  const cartProducts = useAppSelector((state) => state.cart.products);
  console.log({
    totalPages: categoryData.products.totalPages,
    page: categoryData.products.page,
  });

  return (
    <div className="flex-1 p-2">
      <div className="flex flex-col h-full">
        {query && (
          <p className="text-xl text-primary">{`Results of Query : ${query}`}</p>
        )}
        <div className="flex-1">
          {categoryData.products.data.length > 0 ? (
            <div className="grid grid-cols-1  md:grid-cols-3  gap-7 ">
              {categoryData.products.data.map((product) => {
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
            <p className="text-center text-2xl font-semibold">
              No Products Found
            </p>
          )}
        </div>

        {categoryData.products.totalPages > 1 && (
          <Pagination
            className={"justify-end mt-10 max-md:justify-center"}
            totalPages={categoryData.products.totalPages}
            currentPage={categoryData.products.page}
            currentPageLocation={categoryData.slug}
          />
        )}
      </div>
    </div>
  );
}
