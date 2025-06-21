import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getCategory({
  categorySlug,
  searchQuery,
  productsOrder = "asc",
  page,
  pageSize,
}: {
  categorySlug: string;
  searchQuery?: string;
  productsOrder?: "asc" | "desc";
  page: number;
  pageSize: number;
}) {
  const category = await prisma.productCategory.findUnique({
    where: {
      slug: categorySlug,
    },

    include: {
      _count: true,
      products: {
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: { createdAt: productsOrder },
        include: { extras: true, sizes: true, category: true },
        where: searchQuery
          ? { name: { contains: searchQuery, mode: "insensitive" } }
          : {},
      },
    },
  });
  if (!category) {
    return undefined;
  }

  const totalPages = Math.ceil(category._count.products / pageSize);

  return {
    ...category,
    products: { data: category.products, page, totalPages },
  };
}

export const getCategory = unstable_cache(_getCategory, undefined, {
  tags: [PRISMA_CACHE_KEY.CATEGORIES],
});
