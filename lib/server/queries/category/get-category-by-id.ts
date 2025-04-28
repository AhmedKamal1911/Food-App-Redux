import prisma from "@/lib/prisma";

export async function getCategoryById(id: string) {
  return await prisma.productCategory.findUnique({
    where: {
      id,
    },
  });
}
