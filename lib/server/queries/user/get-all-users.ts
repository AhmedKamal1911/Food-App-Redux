import prisma from "@/lib/prisma";
import { requirePermission } from "@/lib/server-utils";

export async function getAllUsers() {
  const isPermitted = await requirePermission(["admin", "superAdmin"]);
  if (!isPermitted) {
    throw new Error("Unauthorized User");
  }
  const users = await prisma.user.findMany();
  return users;
}
