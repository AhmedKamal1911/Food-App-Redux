import { ProductCategory } from "@prisma/client";
import Link from "next/link";

export default function CategoriesViewer({
  categories,
}: {
  categories: ProductCategory[];
}) {
  return (
    <ul className="divide-y-1">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/categories/${category.slug}`}
            className=" block py-4 uppercase text-[16px]  text-gray-500 hover:text-primary transition-colors"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
