import { ProductWithRelations } from "@/lib/types/product";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

// TODO: change placehold.co to local placeholder img
type Props = {
  products: ProductWithRelations[];
};
export default async function RecentProductsViewer({ products }: Props) {
  return (
    <ul className="space-y-1">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            href={`/categories/`}
            className="group flex max-sm:flex-col max-sm:items-center gap-1 py-2 uppercase text-[16px]  text-gray-500 hover:text-primary transition-colors"
          >
            <Image
              className="group-hover:scale-110 transition-[scale]"
              src={product.image ?? "/images/decorations/placeholder.png"}
              alt={product.name}
              height={90}
              width={90}
            />
            <div className="flex justify-center flex-col gap-1 max-sm:text-center">
              <span className="text-primary">
                {format(String(product.createdAt), "MMMM dd - y")}
              </span>
              <span className="text-black tracking-wider text-[18px] font-semibold uppercase">
                {product.name}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
