import Link from "next/link";
import ProductsTable from "./products-table";
import { MoveLeft } from "lucide-react";
import { CartProduct } from "@/lib/types/product";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ProductsResponse } from "@/app/api/products/route";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";

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
      <div className="flex flex-col items-start gap-5 py-10  mt-5 border-t-2">
        <div className="w-full overflow-x-auto">
          {isLoading || isRefetching ? (
            <ShoppingCartSkeletonProducts />
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
          className="flex items-center gap-2 text-rose-800 font-semibold hover:text-rose-500 transition-colors text-xl"
        >
          <MoveLeft /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

function ShoppingCartSkeletonProducts() {
  return (
    <div className="flex flex-col gap-1 min-w-[650px]">
      <div className="space-y-2 px-2">
        <div className="flex items-center justify-between gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 animate-pulse rounded-[2px] p-2  w-[25%] h-[25px]"
            />
          ))}
        </div>
        <div className="bg-gray-300 animate-pulse rounded-sm h-0.5" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <Fragment key={i}>
          <ProductSkeleton />

          <div className="bg-gray-300 animate-pulse rounded-sm h-0.5" />
        </Fragment>
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex gap-32 items-center  p-2">
      <div className="flex gap-2">
        <div className="w-[110px] ">
          <div className="space-y-2">
            <div className="bg-gray-300 animate-pulse rounded-sm h-24" />
            <div className="bg-gray-300 animate-pulse rounded-sm h-7" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 w-[130px] h-[20px]" />
          <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 w-[90px] h-[20px]" />
          <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 w-[110px] h-[20px]" />
        </div>
      </div>

      <div className="flex items-center gap-2 ">
        <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 size-5" />
        <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 w-[50px] h-[30px]" />
        <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 size-5" />
      </div>

      <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 w-[65px] h-[30px]" />

      <div className="bg-gray-300 animate-pulse rounded-[2px] p-2 w-[65px] h-[30px]" />
    </div>
  );
}
