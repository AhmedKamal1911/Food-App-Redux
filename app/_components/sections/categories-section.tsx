import SpecialHeading from "@/components/common/special-heading";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesSection({
  categories,
}: {
  categories: ProductCategory[];
}) {
  return (
    <section className="py-10 sm:py-30  relative">
      <Image
        src={"/images/decorations/weavy-white-bottom.png"}
        height={372}
        width={1536}
        alt="weavy top"
        className="absolute start-0  w-full bg-cover max-h-[120px] bottom-5 translate-y-full rotate-x-180 z-[9]"
      />
      <div className="container">
        <SpecialHeading title="fresh from pizzon" subTitle="our speciality" />
        {categories.length === 0 ? (
          <span className="text-center block text-red-600 font-bold text-xl">
            No Any Categories Found!
          </span>
        ) : (
          <div className="my-7 p-2  flex max-md:flex-col items-center justify-between gap-10">
            {categories
              .slice(0, categories.length > 2 ? 3 : categories.length)
              .map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
          </div>
        )}

        <Button
          asChild
          variant={"outline"}
          className="block text-center text-xl h-11 w-30 mx-auto rounded-3xl font-bold bg-secondary text-white"
        >
          <Link href={"/categories"}>View More</Link>
        </Button>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: ProductCategory }) {
  return (
    <div className="group rounded-md relative">
      <div className="overflow-hidden rounded-md">
        <Image
          className="group-hover:scale-105 group-hover:grayscale-30 transition-all"
          height={400}
          width={400}
          alt={`${category.name} category`}
          src={category.image}
        />
      </div>
      <Link
        href={`/category/${category.slug}`}
        className="before:absolute before:inset-0 mt-3 block text-center uppercase text-2xl font-bold group-hover:text-primary transition-colors"
      >
        {category.name}
      </Link>
    </div>
  );
}
