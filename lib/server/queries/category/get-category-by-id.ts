import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getCategoryById(id: string) {
  return await prisma.productCategory.findUnique({
    where: {
      id,
    },
  });
}

export const getCategoryById = unstable_cache(_getCategoryById, undefined, {
  tags: [PRISMA_CACHE_KEY.CATEGORIES],
});
