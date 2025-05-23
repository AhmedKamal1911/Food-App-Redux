import prisma from "@/lib/prisma";

export async function getAllUsers() {
  const res = await prisma.user.findMany();
  return res;
}
