import { ProductsResponse } from "@/app/api/products/route";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getBaseUrl } from "@/lib/utils";

export async function getProductsByIds(productsIds: string) {
  const res = await fetch(`${getBaseUrl()}/api/products?ids=${productsIds}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: [PRISMA_CACHE_KEY.PRODUCTS],
    },
  });

  return (await res.json()) as ProductsResponse;
}
