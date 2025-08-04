import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { requirePermission } from "@/lib/server-utils";
import { unstable_cache } from "next/cache";

export async function getAllTransactions() {
  const isPermited = await requirePermission(["admin", "superAdmin"]);
  if (!isPermited) throw new Error("Unauthorized User");

  return getUsersTransactions();
}

async function _getUsersTransactions() {
  console.log(`from getUsersTransactions cached`);
  const transactions = await prisma.order.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
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
const getUsersTransactions = unstable_cache(_getUsersTransactions, undefined, {
  tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
});
