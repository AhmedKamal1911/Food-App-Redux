import prisma from "@/lib/prisma";

export async function getUserById(userId: string) {
  const user = prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}
