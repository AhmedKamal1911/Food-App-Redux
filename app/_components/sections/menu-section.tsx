import ProductFilterTabs from "@/components/common/product-filter-tabs";
import SpecialHeading from "@/components/common/special-heading";
import { ProductWithRelations } from "@/lib/types/product";
import { ProductCategory } from "@prisma/client";

type Props = {
  categories: ProductCategory[];
  products: ProductWithRelations[];
};
export default function MenuSection({ categories, products }: Props) {
  return (
    <section className="bg-secondary py-20 sm:py-40">
      <div className="container">
        <SpecialHeading
          title="Fresh From Pizzon"
          subTitle="our special menu"
          className="text-white"
        />
        <ProductFilterTabs categories={categories} products={products} />
      </div>
    </section>
  );
}
