import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getCurrentUserTransactions() {
  const res = await getCurrentSession();
  if (!res.success) {
    redirect("/login", RedirectType.replace);
  }
  const userId = res.session.user.id;
  return await getUserTransactions(userId);
}

async function _getUserTransactions(userId: string) {
  const transactions = await prisma.order.findMany({
    where: { userId: userId },
    include: {
      user: { select: { name: true, email: true } },
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

const getUserTransactions = unstable_cache(_getUserTransactions, undefined, {
  tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
});
