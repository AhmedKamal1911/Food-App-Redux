import CategoriesSection from "./_components/sections/categories-section";
import HeroSection from "./_components/sections/hero-section";
import IntroSection from "./_components/sections/intro-section";
import MenuSection from "./_components/sections/menu-section";
import BookTableSection from "../../components/common/sections/book-table-section";
import BestChefSection from "./_components/sections/best-chef-section";
import ReviewsSection from "../../components/common/sections/reviews-section";
import AboutSection from "./_components/sections/about-section";

import { Metadata } from "next";
import { getAllCategories } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Pizzon delivers fresh, delicious pizzas, pasta, and more straight to your door. Order online for fast delivery and exclusive deals.",
  openGraph: {
    title: "Pizzon Food Delivery – Fresh Pizza & Fast Delivery",
    description:
      "Enjoy fresh pizzas, pasta, and sides from Pizzon. Order online today and get your favorite meals delivered hot and fast.",
  },
};
export default async function Home() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <CategoriesSection categories={categories} />
      <MenuSection categories={categories} />
      <BookTableSection />
      <BestChefSection />
      <ReviewsSection />
      <AboutSection />
    </main>
  );
}
