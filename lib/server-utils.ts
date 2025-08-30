import "server-only";
import bcrypt from "bcrypt";
import { getCurrentSession } from "./dal/user";
import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function requirePermission(roles: UserRole[]) {
  const session = await getCurrentSession();
  if (!session) {
    return false;
  }
  return roles.includes(session.user.role);
}

export async function getSessionCookieString() {
  const cookieStore = await cookies();
  const sessionCookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const sessionCookieValue = cookieStore.get(sessionCookieName)?.value;
  console.log({ sessionCookieName });
  return `${sessionCookieName}=${sessionCookieValue}`;
}
