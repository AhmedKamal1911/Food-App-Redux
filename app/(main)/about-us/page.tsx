import type { Metadata } from "next";
import BookTableSection from "@/components/common/sections/book-table-section";
import ReviewsSection from "@/components/common/sections/reviews-section";
import IntroBanner from "@/components/common/intro-banner";
import AboutRestaurantSection from "./_components/sections/about-restaurant-section";
import OurStorySection from "./_components/sections/our-story";
import ExperienceSection from "./_components/sections/experience-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Pizzon Food Delivery, our commitment to fresh ingredients, fast delivery, and excellent customer service.",
  openGraph: {
    title: "About Us | Pizzon Food Delivery",
    description:
      "Discover the story behind Pizzon, our mission to deliver fresh, delicious meals, and how we put customers first.",
  },
};
export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <IntroBanner
        backgroundSrc="/images/about-page/decoration/about-banner.jpg"
        breadcrumbPaths={[{ name: "about us", href: "/about-us/" }]}
        title="Sollow Burger"
      />
      <AboutRestaurantSection />
      <OurStorySection />
      <ExperienceSection />
      <ReviewsSection />
      <BookTableSection />
    </main>
  );
}
