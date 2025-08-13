import IntroBanner from "@/components/common/intro-banner";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCatSlug,
  getRecentProducts,
  getTotalProductsByCatSlug,
} from "@/lib/server/queries";
import { notFound } from "next/navigation";
import ProductsViewer from "./_components/products-viewer";
import AsideContentWrapper from "./_components/aside-content-wrapper";
import CategoriesViewer from "./_components/categories-viewer";
import SearchInput from "./_components/search-input";
import RecentProductsViewer from "./_components/recent-products-viewer";
import { Suspense } from "react";
import { Metadata } from "next";
import {
  CategoriesListSkeleton,
  ProductsGridSkeleton,
  RecentProductsSkeleton,
} from "./_components/skeletons";

import Awaited from "@/components/common/awaited";

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
  const category = await getCategoryBySlug(categorySlug);
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
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return notFound();
  const { q, page } = await searchParams;
  const totalProductsCount = await getTotalProductsByCatSlug(categorySlug);
  const isProductsEmpty = totalProductsCount === 0;
  const categoriesPromise = getAllCategories();
  const categoryProductsPromise = !isProductsEmpty
    ? getProductsByCatSlug({
        catSlug: categorySlug,
        searchQuery: q ?? "",
        page: +(page ?? 1),
        pageSize: 2,
      })
    : null;
  const recentProductsPromise = getRecentProducts();

  return (
    <main className="min-h-screen">
      <IntroBanner
        breadcrumbPaths={[
          { name: "categories", href: "/categories/" },
          { name: category.name, href: `/${categorySlug}/` },
        ]}
        title={category.name}
      />
      <div className="container">
        <div className="flex max-lg:flex-col-reverse gap-8 py-20">
          <div className="flex flex-col gap-5 md:min-w-[300px] p-2">
            <SearchInput isDisabled={isProductsEmpty} />
            <AsideContentWrapper title="categories">
              <Suspense fallback={<CategoriesListSkeleton />}>
                <Awaited promise={categoriesPromise}>
                  {(categories) => <CategoriesViewer categories={categories} />}
                </Awaited>
              </Suspense>
            </AsideContentWrapper>
            <AsideContentWrapper title="recent products">
              <Suspense fallback={<RecentProductsSkeleton />}>
                <Awaited promise={recentProductsPromise}>
                  {(products) => <RecentProductsViewer products={products} />}
                </Awaited>
              </Suspense>
            </AsideContentWrapper>
          </div>
          <Suspense
            key={`${page ?? 1}-${q ?? ""}`}
            fallback={<ProductsGridSkeleton />}
          >
            {categoryProductsPromise ? (
              <Awaited promise={categoryProductsPromise}>
                {({ page, products, totalPages }) => (
                  <ProductsViewer
                    query={q}
                    page={page}
                    products={products}
                    slug={categorySlug}
                    totalPages={totalPages}
                  />
                )}
              </Awaited>
            ) : (
              <ProductsViewer
                query={q}
                page={+(page ?? 1)}
                products={[]}
                slug={categorySlug}
                totalPages={0}
              />
            )}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
