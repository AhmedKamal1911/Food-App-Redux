import prisma from "@/lib/prisma";

export async function getAllCategories() {
  const categories = await prisma.productCategory.findMany();
  return categories;
}
