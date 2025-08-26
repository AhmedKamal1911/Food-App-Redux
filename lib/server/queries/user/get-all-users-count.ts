import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function _getAllUsersCount() {
  return await prisma.user.count();
}

export const getAllUsersCount = unstable_cache(_getAllUsersCount, undefined, {
  tags: [PRISMA_CACHE_KEY.USERS],
});
