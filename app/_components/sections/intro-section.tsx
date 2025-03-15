import Image from "next/image";

type Feature = {
  id: number;
  img: string;
  title: string;
  desc: string;
};
const features: Feature[] = [
  {
    id: 1,
    img: "/images/intro-section/svgs/food-truck.svg",
    title: "DELIVERY OR PICK UP",
    desc: "Choose your preferred way to enjoy your meal! Opt for hassle-free delivery to your doorstep or quick and convenient pick-up, ensuring your culinary cravings are satisfied just the way you like.",
  },
  {
    id: 2,
    img: "/images/intro-section/svgs/pizza.svg",
    title: "DELICIOUS RECIPES",
    desc: "Discover a world of flavors with our delicious recipes! From gourmet delights to quick and easy meals, explore a diverse range of culinary creations that will tantalize your taste buds and inspire your inner chef.",
  },
  {
    id: 3,
    img: "/images/intro-section/svgs/eat.svg",
    title: "Order Your Food",
    desc: "Satisfy your cravings with just a few clicks! Order your favorite cuisine from a diverse menu, customized to your taste, and enjoy swift delivery or convenient pickup options. Indulge in a delightful dining experience, right at your fingertips.",
  },
];

export default function IntroSection() {
  return (
    <section className="bg-primary py-25 relative">
      <Image
        src={"/images/intro-section/weavy-top.png"}
        height={139}
        width={1918}
        alt="weavy top"
        className="absolute start-0  w-full top-1 -translate-y-full "
      />
      <Image
        src={"/images/intro-section/weavy-bottom.png"}
        height={139}
        width={1918}
        alt="weavy top"
        className="absolute start-0  w-full bottom-1 translate-y-full "
      />
      <div className="container">
        <div className="flex max-md:flex-col items-center justify-between gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div>
        <Image
          height={100}
          width={100}
          alt="feature"
          src={feature.img}
          className="hover:fill-white transition-colors"
        />
      </div>
      <span className="text-secondary font-bold text-2xl lg:text-3xl">
        {feature.title}
      </span>
      <span className="text-center text-[17px]">{feature.desc}</span>
    </div>
  );
}
