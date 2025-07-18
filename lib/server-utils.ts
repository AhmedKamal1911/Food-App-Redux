import "server-only";
import bcrypt from "bcrypt";
import { getCurrentSession } from "./dal/user";
import { UserRole } from "@prisma/client";
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function requirePermission(roles: UserRole[]) {
  const result = await getCurrentSession();
  if (!result.success) {
    return false;
  }
  return roles.includes(result.session.user.role);
}
