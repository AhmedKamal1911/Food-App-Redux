import IntroBanner from "@/components/common/intro-banner";
import { getAllCategories, getCategory } from "@/lib/server/queries";

import { notFound } from "next/navigation";

import ProductsViewer from "./_components/products-viewer";
import AsideContentWrapper from "./_components/aside-content-wrapper";

import CategoriesViewer from "./_components/categories-viewer";
import SearchInput from "./_components/search-input";
import RecentProductsViewer from "./_components/recent-products-viewer";
import { Suspense } from "react";

type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
};
export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const { q, page } = await searchParams;
  const categories = await getAllCategories();
  const categoryData = await getCategory({
    categorySlug,
    searchQuery: q,
    page: +(page ?? 1),
    pageSize: 3,
  });

  if (!categoryData) return notFound();

  return (
    <main className="min-h-screen">
      <IntroBanner title={categoryData.name} />
      <div className="container">
        <div className="flex max-lg:flex-col-reverse gap-8 py-20">
          <div className="flex flex-col gap-5 min-w-[300px] p-2">
            <SearchInput />
            <AsideContentWrapper title="categories">
              <CategoriesViewer categories={categories} />
            </AsideContentWrapper>
            <AsideContentWrapper title="recent products">
              <Suspense>
                <RecentProductsViewer />
              </Suspense>
            </AsideContentWrapper>
          </div>

          <ProductsViewer categoryData={categoryData} />
        </div>
      </div>
    </main>
  );
}
