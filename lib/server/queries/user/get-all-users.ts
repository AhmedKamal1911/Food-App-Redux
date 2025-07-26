import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";

export async function getAllUsers(): Promise<User[] | null> {
  const session = await getCurrentSession();
  if (!session) redirect("/login", RedirectType.replace);
  const res = await prisma.user.findMany();
  return res;
}
