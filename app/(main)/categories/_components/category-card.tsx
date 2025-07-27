import { ProductCategory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  category,
}: {
  category: ProductCategory;
}) {
  return (
    <div className="relative rounded-sm aspect-square overflow-hidden group">
      <Link
        href={`/categories/${category.slug}`}
        className="block w-full h-full relative"
      >
        <Image
          src={category.image ?? "https://placehold.co/600x400/png"}
          alt={`${category.name} category`}
          fill
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent
          translate-y-full group-hover:translate-y-0
          transition-transform duration-700 "
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white uppercase text-2xl font-bold">
              {category.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
