import SpecialHeading from "@/components/common/special-heading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
type Props = {};
export default function CategoriesSection({}: Props) {
  return (
    <section className="py-50  relative">
      <div className="container">
        <SpecialHeading title="fresh from pizzon" subTitle="our speciality" />
        <div className="my-7 p-2  flex max-md:flex-col items-center justify-between gap-10">
          <CategoryCard
            name="burgers"
            src="/images/categories-section/burger.jpg"
          />
          <CategoryCard
            name="pizzas"
            src="/images/categories-section/pizza.jpg"
          />
          <CategoryCard
            name="coffe"
            src="/images/categories-section/coffe.jpg"
          />
        </div>
        <Button
          variant={"outline"}
          className="block text-xl h-11 w-30 mx-auto rounded-3xl font-bold bg-secondary text-white"
        >
          View More
        </Button>
      </div>
      <Image
        src={"/images/categories-section/weavy-white-bottom.png"}
        height={139}
        width={1918}
        alt="weavy top"
        className="absolute start-0  w-full bottom-1 translate-y-full "
      />
    </section>
  );
}

function CategoryCard({ src, name }: { src: string; name: string }) {
  return (
    <div className="group rounded-md relative">
      <div className="overflow-hidden rounded-md">
        <Image
          className="group-hover:scale-105 group-hover:grayscale-30 transition-all"
          height={400}
          width={400}
          alt="category"
          src={src}
        />
      </div>
      <Link
        href={`/category/${name}`}
        className="before:absolute before:inset-0 mt-3 block text-center uppercase text-2xl font-bold group-hover:text-primary transition-colors"
      >
        {name}
      </Link>
    </div>
  );
}
