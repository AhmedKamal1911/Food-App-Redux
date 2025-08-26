import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
async function _getTodaySalesAmount() {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const sales = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      createdAt: {
        gte: today,
      },
      status: "delivered",
    },
  });
  return sales._sum.total ?? 0;
}

export const getTodaySalesAmount = unstable_cache(
  _getTodaySalesAmount,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
  }
);
