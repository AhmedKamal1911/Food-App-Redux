import prisma from "@/lib/prisma";

export async function getFilteredProducts({
  productCategories = [],
}: {
  productCategories?: string[];
}) {
  const products = await prisma.product.findMany({
    include: { category: true, extras: true, sizes: true },
    where: {
      category:
        productCategories.length > 1
          ? {
              slug: {
                in: productCategories,
              },
            }
          : {},
    },
  });

  return products;
}
