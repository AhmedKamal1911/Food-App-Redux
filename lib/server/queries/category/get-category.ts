import prisma from "@/lib/prisma";

export async function getCategory({
  categorySlug,
  searchQuery,
  productsOrder = "asc",
  productsLimit = undefined,
}: {
  categorySlug: string;
  searchQuery?: string;
  productsOrder?: "asc" | "desc";
  productsLimit?: number;
}) {
  const category = await prisma.productCategory.findUnique({
    where: {
      slug: categorySlug,
    },

    include: {
      products: {
        take: productsLimit,
        orderBy: { createdAt: productsOrder },
        include: { extras: true, sizes: true, category: true },
        where: searchQuery
          ? { name: { contains: searchQuery, mode: "insensitive" } }
          : {},
      },
    },
  });
  return category;
}
