import prisma from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
  });
}
export async function getProductFullInfoBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      extras: true,
      sizes: true,
    },
  });
}
