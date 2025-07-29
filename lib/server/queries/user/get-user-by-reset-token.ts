import prisma from "@/lib/prisma";

export async function getUserByResetToken(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordTokenExpires: { gte: new Date() },
    },
  });
  return user;
}
