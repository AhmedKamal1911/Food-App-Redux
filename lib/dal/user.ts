import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { cache } from "react";

export const getCurrentSession = cache(async () => {
  const session = await getServerSession(authOptions);

  return session;
});
