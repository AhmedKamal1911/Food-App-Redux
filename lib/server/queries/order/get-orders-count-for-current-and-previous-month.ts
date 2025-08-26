import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { getCurrentAndPreviousMonthRange } from "@/lib/utils";
import { unstable_cache } from "next/cache";

async function getCurrentMonthOrders() {
  const { startOfCurrentMonth, startOfNextMonth } =
    getCurrentAndPreviousMonthRange();
  return prisma.order.count({
    where: {
      createdAt: {
        gte: startOfCurrentMonth,
        lt: startOfNextMonth,
      },
    },
  });
}
async function getPrevMonthOrders() {
  const { startOfCurrentMonth, startOfPrevMonth } =
    getCurrentAndPreviousMonthRange();
  return prisma.order.count({
    where: {
      createdAt: {
        gte: startOfPrevMonth,
        lt: startOfCurrentMonth,
      },
    },
  });
}

async function _getOrdersCountForCurrentAndPreviousMonth() {
  const [currentOrdersMonthCount, prevOrdersMonthCount] = await Promise.all([
    getCurrentMonthOrders(),
    getPrevMonthOrders(),
  ]);

  return {
    currentOrdersMonthCount,
    prevOrdersMonthCount,
  };
}

export const getOrdersCountForCurrentAndPreviousMonth = unstable_cache(
  _getOrdersCountForCurrentAndPreviousMonth,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
  }
);
