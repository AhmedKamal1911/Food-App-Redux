import ProductCard from "@/components/common/product-card";
import { Product } from "@prisma/client";

type Props = {
  categoryProducts: Product[];
};
export default function ProductsViewer({ categoryProducts }: Props) {
  return (
    <div className="flex-1 p-2">
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-3  gap-7 ">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold">No Products Found</p>
      )}
    </div>
  );
}
