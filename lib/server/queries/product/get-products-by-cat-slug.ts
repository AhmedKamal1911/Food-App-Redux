import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
async function _getTotalProductsByCatSlug(slug: string) {
  return prisma.product.count({
    where: {
      category: {
        slug: slug,
      },
    },
  });
}

export const getTotalProductsByCatSlug = unstable_cache(
  _getTotalProductsByCatSlug,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.PRODUCTS],
  }
);
export async function _getProductsByCatSlug({
  orderBy = "asc",
  ...options
}: {
  catSlug: string;
  pageSize: number;
  page: number;
  orderBy?: "asc" | "desc";
  searchQuery: string;
}) {
  const [productsCount, products] = await Promise.all([
    getTotalProductsByCatSlug(options.catSlug),
    prisma.product.findMany({
      where: {
        category: {
          slug: options.catSlug,
        },
        ...(options.searchQuery
          ? { name: { contains: options.searchQuery, mode: "insensitive" } }
          : {}),
      },
      take: options.pageSize,
      skip: (options.page - 1) * options.pageSize,
      orderBy: { createdAt: orderBy },
      include: { extras: true, sizes: true, category: true },
    }),
  ]);
  console.log({ productsCount });
  const totalPages = Math.ceil(productsCount / options.pageSize);

  return { products, totalPages, page: options.page };
}

export const getProductsByCatSlug = unstable_cache(
  _getProductsByCatSlug,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.PRODUCTS],
  }
);
