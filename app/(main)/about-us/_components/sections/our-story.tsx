import SpecialHeading from "@/components/common/special-heading";
import Image from "next/image";

type Props = {};
export default function OurStorySection({}: Props) {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container">
        <div className="text-center flex flex-col items-center gap-8">
          <SpecialHeading title="discover" subTitle="our story" />
          <p className="max-w-[900px]">
            At Pizzon, our story begins with a passion for perfecting the art of
            pizza. Founded by food enthusiasts who dreamed of bringing an
            exceptional culinary experience to pizza lovers worldwide, our
            journey started with a commitment to quality and innovation.
            Inspired by traditional recipes and guided by a desire to explore
            new flavors, we embarked on a quest to create pizzas that not only
            tantalize taste buds but also tell a story with each slice. Our
            chefs, driven by creativity and expertise, meticulously craft every
            pizza, from the handcrafted dough to the finest, locally sourced
            ingredients.
          </p>
          <div>
            <Image
              src={"/images/about-page/decoration/story.png"}
              width={215}
              height={61}
              alt="manager sign"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
