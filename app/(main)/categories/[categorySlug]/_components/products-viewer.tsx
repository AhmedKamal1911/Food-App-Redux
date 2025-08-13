import ProductCard from "@/components/common/product-card";

import Pagination from "./pagination";

import { ProductWithRelations } from "@/lib/types/product";

type Props = {
  totalPages: number;
  page: number;
  products: ProductWithRelations[];
  slug: string;
  query?: string;
};
export default function ProductsViewer({
  products,
  page,
  totalPages,
  query,
  slug,
}: Props) {
  return (
    <div className="flex-1 p-2">
      <div className="flex flex-col h-full">
        {query && (
          <p className="text-xl text-primary">{`Results of Query : ${query}`}</p>
        )}
        <div className="flex-1">
          {products.length > 0 ? (
            <ProductsGridList products={products} />
          ) : (
            <p className="text-center text-2xl font-semibold">
              No Products Found
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            className={"justify-end mt-10 max-md:justify-center"}
            totalPages={totalPages}
            currentPage={page}
            currentPageLocation={slug}
          />
        )}
      </div>
    </div>
  );
}

function ProductsGridList({ products }: { products: ProductWithRelations[] }) {
  return (
    <div className="grid grid-cols-1  md:grid-cols-3  gap-7 ">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
