import { getRecentProducts } from "@/lib/server/queries";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function RecentProductsViewer() {
  const recentProducts = await getRecentProducts({});

  return (
    <ul className="space-y-1">
      {recentProducts.map((product) => (
        <li key={product.id}>
          <Link
            href={`/categories/`}
            className="group flex gap-1 py-2 uppercase text-[16px]  text-gray-500 hover:text-primary transition-colors"
          >
            <Image
              className="group-hover:scale-110 transition-[scale]"
              src={product.image}
              alt={product.name}
              height={90}
              width={90}
            />
            <div className="flex justify-center flex-col gap-1">
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
