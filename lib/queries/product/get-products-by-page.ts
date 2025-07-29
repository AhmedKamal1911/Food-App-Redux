import { ProductsByPageResponse } from "@/app/api/products/by-page/route";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getBaseUrl } from "@/lib/utils";

export async function getProductsByPage(pageParam = 1, pageSize = 5) {
  try {
    const res = await fetch(
      `${getBaseUrl()}/api/products/by-page?page=${pageParam}&pageSize=${pageSize}`,
      {
        next: {
          tags: [PRISMA_CACHE_KEY.PRODUCTS],
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Failed to fetch products");
    }
    return data as ProductsByPageResponse;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Network error while fetching products");
  }
}
