import prisma from "@/lib/prisma";

export async function getRecentProducts({
  order = "desc",
  limit = 3,
}: {
  order?: "desc" | "asc";
  limit?: number;
}) {
  const recentProducts = await prisma.product.findMany({
    include: { category: true, extras: true, sizes: true },
    orderBy: order ? { createdAt: order } : {},
    take: limit,
  });

  return recentProducts;
}
