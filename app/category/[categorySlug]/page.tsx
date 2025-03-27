import IntroBanner from "@/components/common/intro-banner";
import {
  getAllCategories,
  getAllProducts,
  getCategory,
} from "@/lib/server/queries";

import { redirect } from "next/navigation";

import ProductsViewer from "./_components/products-viewer";
import AsideContentWrapper from "./_components/aside-content-wrapper";

import CategoriesViewer from "./_components/categories-viewer";
import SearchInput from "./_components/search-input";
import RecentProductsViewer from "./_components/recent-products-viewer";

type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ q?: string }>;
};
export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const { q } = await searchParams;
  const categories = await getAllCategories();
  const category = await getCategory({ categorySlug, searchQuery: q });
  const products = await getAllProducts({ limit: 3, order: "desc" });
  if (!category) redirect("/404");

  return (
    <main className="min-h-screen">
      <IntroBanner title={categorySlug} />
      <div className="container">
        <div className="flex max-lg:flex-col-reverse gap-8 py-20">
          <div className="flex flex-col gap-5 min-w-[300px] p-2">
            <SearchInput />
            <AsideContentWrapper title="categories">
              <CategoriesViewer categories={categories} />
            </AsideContentWrapper>
            <AsideContentWrapper title="recent products">
              <RecentProductsViewer recentProducts={products} />
            </AsideContentWrapper>
            {/* <AsideContentWrapper title="tags">

            </AsideContentWrapper> */}
          </div>

          <ProductsViewer categoryProducts={category.products} />
        </div>
      </div>
    </main>
  );
}
