import { ProductWithRelations } from "@/lib/types/product";
import CategoryProductsGridContainer from "./category-products-grid-container";

type Props = {
  categoryProducts: ProductWithRelations[];
};
export default function ProductsViewer({ categoryProducts }: Props) {
  return (
    <div className="flex-1 p-2">
      <CategoryProductsGridContainer categoryProducts={categoryProducts} />
    </div>
  );
}
