import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getRecentProducts({
  order = "desc",
  limit = 3,
}: {
  order?: "desc" | "asc";
  limit?: number;
}) {
  const recentProducts = await prisma.product.findMany({
    include: { category: true, extras: true, sizes: true },
    orderBy: order ? { createdAt: order } : {},
    take: limit,
  });

  return recentProducts;
}

export const getRecentProducts = unstable_cache(_getRecentProducts, undefined, {
  tags: [PRISMA_CACHE_KEY.PRODUCTS],
});
