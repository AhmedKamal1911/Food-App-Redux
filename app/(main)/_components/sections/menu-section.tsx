import ProductFilterTabs from "@/components/common/product-filter-tabs";
import MenuProductsSkeleton from "@/components/common/skeletons/menu-products-skeleton";
import SpecialHeading from "@/components/common/special-heading";
import { getProductsByPage } from "@/lib/queries/product/get-products-by-page";
import { getQueryClient } from "@/providers/react-query-provider/get-query-client";

import { ProductCategory } from "@prisma/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

type Props = {
  categories: ProductCategory[];
};
export default async function MenuSection({ categories }: Props) {
  return (
    <section className="bg-secondary py-20 sm:py-40">
      <div className="container">
        <SpecialHeading
          title="Fresh From Pizzon"
          subTitle="our special menu"
          className="text-white"
        />
        <Suspense fallback={<MenuProductsSkeleton />}>
          <SuspensedContent categories={categories} />
        </Suspense>
      </div>
    </section>
  );
}

async function SuspensedContent({ categories }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: () => getProductsByPage(),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductFilterTabs categories={categories} />
    </HydrationBoundary>
  );
}
