import SpecialHeading from "@/components/common/special-heading";
import Image from "next/image";

export default function AboutRestaurantSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex justify-center items-center max-md:flex-col gap-8 lg:gap-10">
          <div className="flex-1">
            <Image
              src={"/images/about-page/about-restaurant-section/about-1.jpg"}
              height={483}
              width={623}
              alt="about img"
            />
          </div>
          <div className="flex-1">
            <SpecialHeading
              title="delicious restaurant"
              subTitle="about pizzon"
              className="items-start"
            />
            <p className="mt-6">
              Founded on a passion for delivering not just pizzas, but memorable
              moments, Pizzon is more than a pizza place—it’s a culinary
              journey. Join us in savoring the artistry of flavors, where every
              bite tells a story of quality, creativity, and devotion. Come,
              indulge in the pizza experience you deserve. Welcome to the home
              of extraordinary pizzas, where every slice is an invitation to
              culinary delight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
