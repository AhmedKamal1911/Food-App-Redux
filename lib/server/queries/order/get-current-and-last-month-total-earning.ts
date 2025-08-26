import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { getCurrentAndPreviousMonthRange } from "@/lib/utils";
import { unstable_cache } from "next/cache";

async function getCurrentMonthEarning() {
  const { startOfCurrentMonth, startOfNextMonth } =
    getCurrentAndPreviousMonthRange();
  const result = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      createdAt: {
        gte: startOfCurrentMonth,
        lt: startOfNextMonth,
      },
    },
  });
  return result._sum.total ?? 0;
}

async function getPrevMonthEarning() {
  const { startOfCurrentMonth, startOfPrevMonth } =
    getCurrentAndPreviousMonthRange();
  const result = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      createdAt: {
        gte: startOfPrevMonth,
        lt: startOfCurrentMonth,
      },
    },
  });
  return result._sum.total ?? 0;
}

async function _getCurrentAndLastMonthTotalEarning() {
  const [currentMonthEarning, prevMonthEarning] = await Promise.all([
    getCurrentMonthEarning(),
    getPrevMonthEarning(),
  ]);

  return {
    currentMonthEarning,
    prevMonthEarning,
  };
}

export const getCurrentAndLastMonthTotalEarning = unstable_cache(
  _getCurrentAndLastMonthTotalEarning,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
  }
);
