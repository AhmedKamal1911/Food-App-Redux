import SpecialHeading from "@/components/common/special-heading";

export default function ExperienceSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex justify-center items-center max-md:flex-col gap-8 lg:gap-10">
          <div className="flex-1">
            <video
              className="rounded-sm"
              autoPlay
              loop
              width="720"
              height="340"
            >
              <source
                src="/images/about-page/decoration/video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {/* <Image
              src={"/images/about-page/about-restaurant-section/about-1.jpg"}
              height={483}
              width={623}
              alt="about img"
            /> */}
          </div>
          <div className="flex-1">
            <SpecialHeading
              title="modern cuisine"
              subTitle="experience"
              className="items-start"
            />
            <p className="mt-6">
              Our commitment to excellence ensures every pizza is a masterpiece,
              meticulously prepared for your delight. Whether you prefer thin
              crust or deep-dish, traditional or exotic toppings, we cater to
              diverse tastes, creating a personalized pizza journey just for
              you. At Pizzon, we redefine your pizza expectations with
              unparalleled quality and impeccable service. From the first bite
              to the last, savor the perfect blend of crispiness, freshness, and
              mouthwatering flavors. Discover a world of taste that transcends
              the ordinary – your best pizza experience starts here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
