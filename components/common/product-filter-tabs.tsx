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
import { LoaderCircle } from "lucide-react";
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
  const getMoreProducts = () => {
    fetchNextPage();
  };
  console.log({ filteredData });

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

      {filteredData &&
        (filteredData[0].length === 0 ? (
          <span className="text-center block text-red-600 font-bold text-xl">
            No Any Products In This Category
          </span>
        ) : (
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  xl:gap-10 "
            }
          >
            {filteredData.map((page, i) => {
              return (
                <Fragment key={`page-${i}`}>
                  {page.map((product) => {
                    const totalQuantity =
                      cartProducts[product.id]?.reduce(
                        (acc, curr) => acc + curr.qty,
                        0
                      ) ?? 0;

                    return (
                      <Fragment key={product.id}>
                        <AnimatePresence>
                          <motion.div
                            layout
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            transition={{
                              duration: 0.4,
                              ease: "easeIn",
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                          >
                            <ProductCard
                              product={product}
                              productQty={totalQuantity}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        ))}

      {isFetchingNextPage ? (
        <div className="flex flex-col gap-3 justify-center items-center">
          <div>
            <LoaderCircle className="size-14 text-primary animate-spin" />
          </div>
          <p className="text-primary font-semibold tracking-wider text-xl animate-bounce text-center">
            Loading...
          </p>
        </div>
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
