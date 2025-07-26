import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

async function _getUserTransactions() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login", RedirectType.replace);
  }

  const transactions = await prisma.order.findMany({
    where: { userId: session.user.id },
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

export const getCurrentUserTransactions = unstable_cache(
  _getUserTransactions,
  undefined,
  {
    tags: [PRISMA_CACHE_KEY.TRANSACTIONS],
  }
);
