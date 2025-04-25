import prisma from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
  });
}
