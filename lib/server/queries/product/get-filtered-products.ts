import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getFilteredProducts({
  productCategories = [],
  page,
  pageSize,
}: {
  productCategories?: string[];
  page: number;
  pageSize: number;
}) {
  // 1) Get the total *count* of filtered products
  const totalCount = await prisma.product.count({
    where: {
      OR: [
        // Match products with specific category slugs
        productCategories.length > 0
          ? {
              category: {
                slug: {
                  in: productCategories.filter((c) => c !== "noCategory"),
                },
              },
            }
          : {},
        // Match products where category is null
        productCategories.includes("noCategory") ? { categoryId: null } : {},
      ],
    },
  });

  // 2) Compute how many *pages* that makes
  const totalPages = Math.ceil(totalCount / pageSize);

  // 3) Then fetch just this page of data
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: { category: true, extras: true, sizes: true },
    where: {
      OR: [
        // Match products with specific category slugs
        productCategories.length > 0
          ? {
              category: {
                slug: {
                  in: productCategories.filter((c) => c !== "noCategory"),
                },
              },
            }
          : {},
        // Match products where category is null
        productCategories.includes("noCategory") ? { categoryId: null } : {},
      ],
    },
  });
  return { products, currentPage: page, totalPages, pageSize, totalCount };
}

export const getFilteredProducts = unstable_cache(
  _getFilteredProducts,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.PRODUCTS],
  }
);
