"use client";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FoodCategoryKeys, Product } from "@/lib/types/shared";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ProductFilterTabs({
  categories,
  products,
}: {
  categories: Record<FoodCategoryKeys, string>;
  products: Product[];
}) {
  const [category, setCategory] = useState("all");
  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? products
        : products.filter((product) => product.category === category),
    [category, products]
  );
  console.log({ filteredProducts });
  return (
    <div>
      <FilterTabs
        selectedCategory={category}
        categories={categories}
        setCategory={setCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  xl:gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function FilterTabs({
  setCategory,
  categories,
  selectedCategory,
}: {
  setCategory: Dispatch<SetStateAction<string>>;
  categories: Record<FoodCategoryKeys, string>;
  selectedCategory: string;
}) {
  return (
    <div className="bg-muted rounded-sm overflow-hidden flex my-20 gap-2  w-fit  mx-auto max-md:flex-wrap max-md:justify-center ">
      {Object.keys(categories)
        .reverse()
        .map((category, i) => (
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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className=" bg-gradient-to-b from-[#f5482a] to-[#f56003] p-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
      <Link
        href={`/products/${product.label}`}
        className="bg-white rounded-lg shadow-md flex justify-center items-center py-3"
      >
        <Image
          src={product.imgSrc}
          alt={product.label}
          height={100}
          width={100}
        />
      </Link>

      <div className="mt-4 flex flex-col gap-3 items-start justify-start ">
        <span className="bg-black/20 text-white text-sm uppercase px-3 py-1 rounded-full tracking-wide">
          {product.category}
        </span>

        <Link
          href={`/products/${product.label}`}
          title={product.label}
          className=" text-xl font-bold text-white line-clamp-1 break-words  word-break"
        >
          {product.label}
        </Link>

        <div className="flex items-center justify-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={18} fill={"currentColor"} />
          ))}
        </div>

        <span className="block text-lg font-semibold text-white">
          $ {product.price.toFixed(2)}
        </span>

        <button className="cursor-pointer mt-3 bg-white text-[#f5632a] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
          Order Now
        </button>
      </div>
    </div>
  );
}
{
  /* <Button
variant={"outline"}
className="bg-white rounded-3xl text-secondary border-secondary hover:border-secondary hover:bg-secondary hover:text-white font-bold w-fit"
>
Add to Cart
</Button> */
}
