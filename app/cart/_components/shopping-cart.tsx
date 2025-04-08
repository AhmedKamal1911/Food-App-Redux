import Link from "next/link";
import ProductsTable from "./products-table";
import { MoveLeft } from "lucide-react";
import { CartProduct } from "@/lib/types/product";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ProductsResponse } from "@/app/api/products/route";
import { Button } from "@/components/ui/button";

export default function ShoppingCart({
  products,
  itemsCount,
  error,
  isLoading,
  isRefetching,
  refetchCartProducts,
}: {
  products: CartProduct[];
  itemsCount: number;
  error: Error | null;
  isLoading: boolean;
  isRefetching: boolean;
  refetchCartProducts: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ProductsResponse, Error>>;
}) {
  return (
    <div className=" p-5 flex-1 md:p-8 xl:p-15">
      <div className="flex justify-between items-center">
        <span className="text-2xl capitalize">shopping cart</span>
        <span className="text-xl font-semibold uppercase">
          {itemsCount} items
        </span>
      </div>
      <div className="flex flex-col gap-5 py-10  mt-5 border-t-2">
        <div className="w-full overflow-x-auto">
          {isLoading || isRefetching ? (
            <span className="text-purple-600 text-2xl text-center block">
              Loading
            </span>
          ) : error ? (
            <div className="flex gap-5 items-center flex-col">
              <span className="text-red-500 text-2xl font-semibold">
                Failed to get cart products
              </span>
              <Button
                variant={"destructive"}
                onClick={() => refetchCartProducts()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <ProductsTable products={products} />
          )}
        </div>
        <Link
          href={"/menu"}
          className="flex gap-3 text-violet-800 font-semibold hover:text-violet-500 transition-colors"
        >
          <MoveLeft /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
