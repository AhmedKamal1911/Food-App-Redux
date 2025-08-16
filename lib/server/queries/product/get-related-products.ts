import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";

async function _getRelatedProducts(categoryId: string): Promise<Product[]> {
  if (!categoryId) {
    return [];
  }
  const res = await prisma.productCategory.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      products: true,
    },
  });

  if (!res) {
    return [];
  }

  return res.products;
}

export const getRelatedProducts = unstable_cache(
  _getRelatedProducts,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.PRODUCTS],
  }
);
