import IntroBanner from "@/components/common/intro-banner";
import { getAllCategories, getCategory } from "@/lib/server/queries";

import { notFound } from "next/navigation";

import ProductsViewer from "./_components/products-viewer";
import AsideContentWrapper from "./_components/aside-content-wrapper";

import CategoriesViewer from "./_components/categories-viewer";
import SearchInput from "./_components/search-input";
import RecentProductsViewer from "./_components/recent-products-viewer";
import { Suspense } from "react";
import { Metadata } from "next";
type Props = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategory({ categorySlug });
  if (!category) {
    return {
      title: "Category Not Found | Pizzon Food Delivery",
      description: "Category not found.",
    };
  }
  const description = `Explore our tasty selection of ${category.name.toLowerCase()} at Pizzon Food Delivery. Order fresh and fast!`;

  return {
    title: `${category.name} | Pizzon Food Delivery`,
    description,
    openGraph: {
      title: `${category.name} | Pizzon Food Delivery`,
      description,
    },
  };
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const { q, page } = await searchParams;
  const categories = await getAllCategories();
  const categoryData = await getCategory({
    categorySlug,
    searchQuery: q,
    page: +(page ?? 1),
    pageSize: 6,
  });

  if (!categoryData) return notFound();

  return (
    <main className="min-h-screen">
      <IntroBanner
        breadcrumbPaths={[
          { name: "categories", href: "/categories/" },
          { name: categoryData.name, href: `/${categorySlug}/` },
        ]}
        title={categoryData.name}
      />
      <div className="container">
        <div className="flex max-lg:flex-col-reverse gap-8 py-20">
          <div className="flex flex-col gap-5 min-w-[300px] p-2">
            <SearchInput isDisabled={categoryData.products.data.length < 1} />
            <AsideContentWrapper title="categories">
              <CategoriesViewer categories={categories} />
            </AsideContentWrapper>
            <AsideContentWrapper title="recent products">
              <Suspense>
                <RecentProductsViewer />
              </Suspense>
            </AsideContentWrapper>
          </div>

          <ProductsViewer query={q} categoryData={categoryData} />
        </div>
      </div>
    </main>
  );
}
