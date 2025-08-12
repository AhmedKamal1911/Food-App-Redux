import IntroBanner from "@/components/common/intro-banner";
import SectionDivider from "@/components/common/section-divider";
import { getAllCategories } from "@/lib/server/queries";
import CategoryCard from "./_components/category-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse Pizzon’s food categories including pizzas, pasta, sides, and drinks. Find your favorites and order fresh meals delivered fast.",
  openGraph: {
    title: "Categories | Pizzon Food Delivery",
    description:
      "Explore a variety of food categories at Pizzon. Order fresh pizzas, pasta, sides, and more with fast delivery to your door.",
  },
};
export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <main className="min-h-screen">
      <IntroBanner
        title="Categories"
        breadcrumbPaths={[{ name: "categories", href: "/categories/" }]}
      />
      <section className="flex flex-col gap-10 py-8 ">
        <SectionDivider title="Our Categories" />
        <div className="container">
          {categories.length >= 1 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <p className="text-center">No Categories Found!</p>
          )}
        </div>
      </section>
    </main>
  );
}
