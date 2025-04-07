import { ProductsResponse } from "@/app/api/products/route";

export async function getProductsByIds(productsIds: string) {
  const res = await fetch(`/api/products?ids=${productsIds}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await res.json()) as ProductsResponse;
}
