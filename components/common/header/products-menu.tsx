import { Product } from "@prisma/client";
import { SubMenuContainer } from ".";
import Image from "next/image";
import Link from "next/link";

export default function ProductsMenu({ products }: { products: Product[] }) {
  return (
    <SubMenuContainer className="w-full start-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
      {products.length !== 0 && (
        <ul className="flex justify-center flex-wrap">
          {products
            .slice(0, products.length >= 6 ? 6 : products.length)
            .map((product) => (
              <li key={product.id} className="flex-[30%]">
                <MenuProduct product={product} />
              </li>
            ))}
        </ul>
      )}
    </SubMenuContainer>
  );
}
function MenuProduct({ product }: { product: Product }) {
  return (
    <div className="text-black hover:bg-primary/10 transition-colors relative flex items-center px-5 p-1">
      <div className="shrink-0">
        <Image
          src={product.image ?? "https://placehold.co/600x400.png"}
          alt={product.name}
          height={100}
          width={100}
        />
      </div>
      <div className="flex flex-col">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 word-break before:absolute before:inset-0"
        >
          {product.name}
        </Link>
        <span className="text-primary">${product.price}</span>
      </div>
    </div>
  );
}
