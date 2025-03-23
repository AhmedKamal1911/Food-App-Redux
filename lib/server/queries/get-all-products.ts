import prisma from "@/lib/prisma";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return products;
}
