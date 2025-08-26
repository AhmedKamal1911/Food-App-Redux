import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
async function _getTotalOrders() {
  return await prisma.order.count();
}

export const getTotalOrders = unstable_cache(_getTotalOrders, undefined, {
  tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
});
