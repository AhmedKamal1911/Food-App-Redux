import IntroBanner from "@/components/common/intro-banner";
import ProductFilterTabs from "@/components/common/product-filter-tabs";
import { getAllCategories } from "@/lib/server/queries";
import BestChefSection from "../_components/sections/best-chef-section";

import BookTableSection from "@/components/common/sections/book-table-section";
import { ProductCategory } from "@prisma/client";
import { Suspense } from "react";
import MenuProductsSkeleton from "@/components/common/skeletons/menu-products-skeleton";

export default async function MenuPage() {
  const categories = await getAllCategories();
  return (
    <main className="bg-white pb-10">
      <IntroBanner
        title="Menu"
        breadcrumbPaths={[{ name: "menu", href: "/menu/" }]}
      />
      <div className="container">
        <Suspense fallback={<MenuProductsSkeleton />}>
          <SuspensedContent categories={categories} />
        </Suspense>
      </div>
      <BestChefSection />

      <BookTableSection />
    </main>
  );
}

async function SuspensedContent({
  categories,
}: {
  categories: ProductCategory[];
}) {
  return (
    <ProductFilterTabs categories={categories} className="text-secondary" />
  );
}
