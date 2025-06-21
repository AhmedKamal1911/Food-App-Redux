import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function _getAllCategories() {
  const categories = await prisma.productCategory.findMany();
  return categories;
}

export const getAllCategories = unstable_cache(_getAllCategories, undefined, {
  tags: [PRISMA_CACHE_KEY.CATEGORIES],
});
