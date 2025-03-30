"use server";

import prisma from "@/lib/prisma";

export const getProductsByPage = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / pageSize);
  const products = await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    include: {
      category: true,
      extras: true,
      sizes: true,
    },
    take: pageSize,
  });

  return { products, totalPages, page };
};
