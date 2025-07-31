import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getCurrentUserTransactions() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login", RedirectType.replace);
  }
  console.dir({ session });
  const getUserTransactionsById = unstable_cache(
    async () => {
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
      console.dir({ transactions: transactions });
      return transactions;
    },
    undefined,
    {
      tags: [`${PRISMA_CACHE_KEY.TRANSACTIONS}-${session.user.id}`],
    }
  );
  return await getUserTransactionsById();
}
