// import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
// import { unstable_cache } from "next/cache";

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

// export const getUserById = unstable_cache(_getUserById, undefined, {
//   tags: [PRISMA_CACHE_KEY.USERS],
// });
