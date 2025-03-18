import ProductFilterTabs from "@/components/common/product-filter-tabs";
import SpecialHeading from "@/components/common/special-heading";
import { FoodCategoryKeys, Product } from "@/lib/types/shared";

type Props = {
  categories: Record<FoodCategoryKeys, string>;
  products: Product[];
};
export default function MenuSection({ categories, products }: Props) {
  return (
    <section className="bg-secondary pt-50 pb-70">
      <div className="container">
        <SpecialHeading
          title="Fresh From Pizzon"
          subTitle="our special menu"
          subTitleClassName="text-white"
        />
        <ProductFilterTabs categories={categories} products={products} />
      </div>
    </section>
  );
}
