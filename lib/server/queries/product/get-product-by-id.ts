import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getProductById(id: string) {
  return await prisma.product.findUnique({
    include: {
      extras: true,
      sizes: true,
    },
    where: {
      id,
    },
  });
}

export const getProductById = unstable_cache(_getProductById, undefined, {
  tags: [PRISMA_CACHE_KEY.PRODUCTS],
});
