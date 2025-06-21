import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function _getAllProducts() {
  const products = await prisma.product.findMany({
    include: { category: true, extras: true, sizes: true },
  });

  return products;
}

export const getAllProducts = unstable_cache(_getAllProducts, undefined, {
  tags: [PRISMA_CACHE_KEY.PRODUCTS],
});
