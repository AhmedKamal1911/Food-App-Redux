import prisma from "@/lib/prisma";

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    include: {
      extras: true,
      sizes: true,
    },
    where: {
      id,
    },
  });
}
