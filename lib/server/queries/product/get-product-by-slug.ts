import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
  });
}

async function _getProductFullInfoBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      extras: true,
      sizes: true,
    },
  });
}

export const getProductBySlug = unstable_cache(_getProductBySlug, undefined, {
  tags: [PRISMA_CACHE_KEY.PRODUCTS],
});
export const getProductFullInfoBySlug = unstable_cache(
  _getProductFullInfoBySlug,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.PRODUCTS],
  }
);
