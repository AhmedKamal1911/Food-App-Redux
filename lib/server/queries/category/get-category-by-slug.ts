import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getCategoryBySlug(slug: string) {
  return await prisma.productCategory.findUnique({
    where: {
      slug,
    },
  });
}
// TODO: change tag to more speicifc tag that includes categories+slug
export const getCategoryBySlug = unstable_cache(_getCategoryBySlug, undefined, {
  tags: [PRISMA_CACHE_KEY.CATEGORIES],
});
