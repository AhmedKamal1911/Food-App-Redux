import SpecialHeading from "@/components/common/special-heading";
import Image from "next/image";

import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-between max-md:flex-col gap-5 max-md:gap-8">
          <div className=" flex items-start flex-col gap-4 max-md:items-center">
            <SpecialHeading
              title="delicious restaurant"
              subTitle="about pizzon"
              className="text-center md:text-start"
            />
            <p className="italic max-w-[500px] max-md:text-center">
              Founded on a passion for delivering not just pizzas, but memorable
              moments, Pizzon is more than a pizza place—it’s a culinary
              journey. Join us in savoring the artistry of flavors, where every
              bite tells a story of quality, creativity, and devotion. Come,
              indulge in the pizza experience you deserve. Welcome to the home
              of extraordinary pizzas, where every slice is an invitation to
              culinary delight.
            </p>
            <Link
              href={"#"}
              className="text-xl py-3 px-5 md:px-8 rounded-4xl font-bold bg-secondary text-white hover:bg-white hover:text-primary  border border-primary transition-all"
            >
              View More
            </Link>
          </div>
          <div>
            <Image
              src={"/images/about-section/about-pizzon.png"}
              width={360}
              height={694}
              alt="about pizzon img"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
