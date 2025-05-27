import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export async function getRelatedProducts(
  categoryId: string
): Promise<Product[]> {
  const res = await prisma.productCategory.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      products: true,
    },
  });

  if (!res) {
    return [];
  }

  return res.products;
}
