import { getAllCategories, getFilteredProducts } from "@/lib/server/queries";
import RevenueChartBars from "./_components/revenue-chart-bars";

import KPICardsContainer from "./_components/kpi-cards-container";
import ProductsTableSection from "./_components/products-table-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Manage your menu items in the Pizzon Dashboard. Add, edit, or remove pizzas, pasta, and other food products to keep your offerings fresh.",
  openGraph: {
    title: "Products | Dashboard | Pizzon Food Delivery",
    description:
      "Control your food menu with ease. Update product details, pricing, and availability in the Pizzon Dashboard.",
  },
};
type Props = {
  searchParams: Promise<{
    cat: string;
    page: string;
  }>;
};
export default async function ProductsPage({ searchParams }: Props) {
  const categories = await getAllCategories();
  const { cat, page } = await searchParams;
  const catList = cat?.split(",") ?? categories.map((c) => c.slug);

  const { currentPage, totalPages, products } = await getFilteredProducts({
    productCategories: catList,
    page: Number(page) || 1,
    pageSize: 5,
  });

  return (
    <div className="space-y-4">
      {/* Top Section: Chart + Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white p-4 rounded-lg shadow">
          {/* You can plug in a chart like Recharts or Chart.js here */}
          <span className="text-xl font-semibold text-primary mb-3 block">
            Revenue
          </span>

          <RevenueChartBars />
        </div>

        {/* key performance indicator Cards */}
        <KPICardsContainer />
      </div>

      {/* Product Table Section */}
      <ProductsTableSection
        categories={categories}
        page={currentPage}
        lastPage={totalPages}
        data={products}
      />
    </div>
  );
}
