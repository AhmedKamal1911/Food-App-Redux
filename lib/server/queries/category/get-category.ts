import prisma from "@/lib/prisma";

export async function getCategory({
  categorySlug,
  searchQuery,
  productsOrder = "asc",
  page,
  pageSize,
}: {
  categorySlug: string;
  searchQuery?: string;
  productsOrder?: "asc" | "desc";
  page: number;
  pageSize: number;
}) {
  const category = await prisma.productCategory.findUnique({
    where: {
      slug: categorySlug,
    },

    include: {
      _count: true,
      products: {
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: { createdAt: productsOrder },
        include: { extras: true, sizes: true, category: true },
        where: searchQuery
          ? { name: { contains: searchQuery, mode: "insensitive" } }
          : {},
      },
    },
  });
  if (!category) {
    return undefined;
  }

  const totalPages = Math.ceil(category._count.products / pageSize);

  return {
    ...category,
    products: { data: category.products, page, totalPages },
  };
}
