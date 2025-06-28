import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getUserTransactions() {
  const transactions = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          selectedExtras: true,
          selectedSize: true,
          product: true,
        },
      },
    },
  });

  return transactions;
}

export const getUserTransactions = unstable_cache(
  _getUserTransactions,
  undefined,
  { tags: [PRISMA_CACHE_KEY.TRANSACTIONS] }
);
