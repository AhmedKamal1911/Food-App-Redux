import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getTotalOrdersEarning() {
  const sales = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      status: "delivered",
    },
  });
  return sales._sum.total ?? 0;
}

export const getTotalOrdersEarning = unstable_cache(
  _getTotalOrdersEarning,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
  }
);
