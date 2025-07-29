import IntroBanner from "@/components/common/intro-banner";
import ProductFilterTabs from "@/components/common/product-filter-tabs";
import { getAllCategories } from "@/lib/server/queries";
import BestChefSection from "../_components/sections/best-chef-section";

import BookTableSection from "@/components/common/sections/book-table-section";

export default async function MenuPage() {
  const categories = await getAllCategories();
  return (
    <main className="bg-white pb-10">
      <IntroBanner
        title="Menu"
        breadcrumbPaths={[{ name: "menu", href: "/menu/" }]}
      />
      <div className="container">
        <ProductFilterTabs categories={categories} className="text-secondary" />
      </div>
      <BestChefSection />

      <BookTableSection />
    </main>
  );
}
