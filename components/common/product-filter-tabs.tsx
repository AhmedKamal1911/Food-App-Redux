"use client";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { ProductWithRelations } from "@/lib/types/product";
import { ProductCategory } from "@prisma/client";
import { CategoriesNameList } from "@/lib/types/category";

import ProductCard from "./product-card";

export default function ProductFilterTabs({
  categories,
  products,
}: {
  categories: ProductCategory[];
  products: ProductWithRelations[];
}) {
  const categoriesNameList = useMemo(
    () => ["all", ...categories.map((category) => category.name)],
    [categories]
  );
  // FIXME: think about usememo here
  const [category, setCategory] = useState("all");
  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? products
        : products.filter((product) => product.category?.name === category),
    [category, products]
  );

  const getMoreProducts = () => {};

  // TODO: create pagination here
  return (
    <div className="flex flex-col gap-10 mt-10">
      <FilterTabs
        selectedCategory={category}
        categories={categoriesNameList}
        setCategory={setCategory}
      />
      {filteredProducts.length < 1 ? (
        <span className="text-center block text-red-600 font-bold text-xl">
          No Any Products In This Category
        </span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  xl:gap-10 text-white">
          {filteredProducts.map((product) => (
            <AnimatePresence key={product.id}>
              <ProductCard product={product} />
            </AnimatePresence>
          ))}
        </div>
      )}
      <Button
        onClick={getMoreProducts}
        variant={"outline"}
        className="text-white py-6 px-11 rounded-4xl font-bold capitalize text-xl  self-center"
      >
        load more
      </Button>
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
