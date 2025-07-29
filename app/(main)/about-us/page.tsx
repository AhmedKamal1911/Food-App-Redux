import IntroBanner from "@/components/common/intro-banner";
import AboutRestaurantSection from "./_components/sections/about-restaurant-section";
import OurStorySection from "./_components/sections/our-story";
import ExperienceSection from "./_components/sections/experience-section";
import ReviewsSection from "../../../components/common/sections/reviews-section";
import BookTableSection from "../../../components/common/sections/book-table-section";

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
