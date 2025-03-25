import prisma from "@/lib/prisma";

export async function getAllProducts({
  order = "asc",
  limit = undefined,
}: {
  order?: "desc" | "asc";
  limit?: number;
}) {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: order ? { createdAt: order } : {},
    take: limit,
  });
  return products;
}
