import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
type Options = {
  order?: "desc" | "asc";
  limit?: number;
};
async function _getRecentProducts(
  options: Options = { order: "desc", limit: 5 }
) {
  const recentProducts = await prisma.product.findMany({
    include: { category: true, extras: true, sizes: true },
    orderBy: options.order ? { createdAt: options.order } : {},
    take: options.limit,
  });

  return recentProducts;
}

export const getRecentProducts = unstable_cache(_getRecentProducts, undefined, {
  tags: [PRISMA_CACHE_KEY.PRODUCTS],
});
