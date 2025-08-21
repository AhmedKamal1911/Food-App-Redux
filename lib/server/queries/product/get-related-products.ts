import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";

import { unstable_cache } from "next/cache";

async function _getRelatedProducts(categoryId: string, productId: string) {
  const relatedProducts = await prisma.product.findMany({
    where: {
      AND: [{ id: { not: productId } }, { categoryId: categoryId }],
    },
  });

  return relatedProducts;
}

export const getRelatedProducts = unstable_cache(
  _getRelatedProducts,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.PRODUCTS],
  }
);
