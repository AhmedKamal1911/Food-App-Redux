import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getAllUsers(): Promise<User[] | null> {
  const sessionResult = await getCurrentSession();
  if (!sessionResult.success) return null;
  const res = await prisma.user.findMany();
  return res;
}
