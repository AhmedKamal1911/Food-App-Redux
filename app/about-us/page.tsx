import IntroBanner from "@/components/common/intro-banner";
import AboutRestaurantSection from "./components/sections/about-restaurant-section";
import OurStorySection from "./components/sections/our-story";
import ExperienceSection from "./components/sections/experience-section";
import ReviewsSection from "../../components/common/sections/reviews-section";
import BookTableSection from "../../components/common/sections/book-table-section";

type Props = {};
export default function AboutUs({}: Props) {
  return (
    <main className="min-h-screen">
      <IntroBanner
        backgroundSrc="/images/about-page/decoration/about-banner.jpg"
        pageName="Sollow Burger"
      />
      <AboutRestaurantSection />
      <OurStorySection />
      <ExperienceSection />
      <ReviewsSection />
      <BookTableSection />
    </main>
  );
}
