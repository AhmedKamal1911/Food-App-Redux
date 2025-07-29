"use client";
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

import { ProductCategory } from "@prisma/client";
import { CategoriesNameList } from "@/lib/types/category";

import ProductCard from "./product-card";
import { useAppSelector } from "@/lib/redux/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getProductsByPage } from "@/lib/queries/product/get-products-by-page";
export default function ProductFilterTabs({
  categories,
  className,
}: {
  categories: ProductCategory[];
  className?: string;
}) {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam = 1 }) => getProductsByPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page >= lastPage.totalPages
          ? undefined
          : lastPage.page + 1;
      },
    });
  console.log({ data, error, fetchNextPage, hasNextPage, isFetchingNextPage });
  const cartProducts = useAppSelector((state) => state.cart.products);

  const categoriesNameList = useMemo(
    () => ["all", ...categories.map((category) => category.name)],
    [categories]
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredData = useMemo(
    () =>
      selectedCategory === "all"
        ? data?.pages.map((page) => page.products.map((product) => product))
        : data?.pages.map((page) =>
            page.products.filter(
              (product) => product.category?.name === selectedCategory
            )
          ),

    [selectedCategory, data]
  );
  console.log({ filteredData, selectedCategory });
  const getMoreProducts = () => {
    fetchNextPage();
  };

  return (
    <div className={cn("flex flex-col gap-10 my-10 text-white", className)}>
      <FilterTabs
        selectedCategory={selectedCategory}
        categories={categoriesNameList}
        setCategory={setSelectedCategory}
      />

      {error && (
        <span className="text-center block text-red-600 font-bold text-xl">
          {error.message}
        </span>
      )}
      {filteredData && filteredData.length === 0 ? (
        <span className="text-center block text-red-600 font-bold text-xl">
          No Any Products In This Category
        </span>
      ) : (
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  xl:gap-10 "
          }
        >
          {filteredData?.map((page, i) => {
            return (
              <Fragment key={`page-${i}`}>
                {page.map((product) => {
                  const totalQuantity =
                    cartProducts[product.id]?.reduce(
                      (acc, curr) => acc + curr.qty,
                      0
                    ) ?? 0;

                  return (
                    <AnimatePresence key={product.id}>
                      <ProductCard
                        product={product}
                        productQty={totalQuantity}
                      />
                    </AnimatePresence>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      )}
      {/* TODO: create loading boundry */}
      {isFetchingNextPage ? (
        <p className="text-white text-center">Loading</p>
      ) : (
        hasNextPage && (
          <Button
            onClick={getMoreProducts}
            variant={"outline"}
            className="text-white py-6 px-11 rounded-4xl font-bold capitalize text-xl  self-center"
          >
            load more
          </Button>
        )
      )}
    </div>
  );
}

function FilterTabs({
  setCategory,
  categories,
  selectedCategory,
}: {
  setCategory: Dispatch<SetStateAction<string>>;
  categories: CategoriesNameList;
  selectedCategory: string;
}) {
  return (
    <div className="bg-muted rounded-sm overflow-hidden flex  gap-2  w-fit  mx-auto max-md:flex-wrap max-md:justify-center ">
      {categories.map((category, i) => (
        <button
          key={i}
          onClick={() => {
            setCategory(category);
          }}
          className={cn(
            "relative z-10 focus:outline-0 cursor-pointer transition-colors w-fit py-2 px-7 rounded-sm text-[18px] capitalize text-white font-semibold",
            selectedCategory !== category && "hover:bg-primary"
          )}
        >
          {category}
          {selectedCategory === category && (
            <motion.div
              layoutId="red-box"
              className="absolute inset-0  bg-primary rounded-sm -z-10"
            />
          )}
        </button>
      ))}
    </div>
  );
}
