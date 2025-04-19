import prisma from "@/lib/prisma";

export async function getFilteredProducts({
  productCategories = [],
  page,
  pageSize,
}: {
  productCategories?: string[];
  page: number;
  pageSize: number;
}) {
  // 1) Get the total *count* of filtered products
  const totalCount = await prisma.product.count({
    where: {
      category:
        productCategories.length > 0 ? { slug: { in: productCategories } } : {},
    },
  });

  // 2) Compute how many *pages* that makes
  const totalPages = Math.ceil(totalCount / pageSize);

  // 3) Then fetch just this page of data
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: { category: true, extras: true, sizes: true },
    where: {
      category:
        productCategories.length > 0 ? { slug: { in: productCategories } } : {},
    },
  });

  return { products, currentPage: page, totalPages, pageSize, totalCount };
}
