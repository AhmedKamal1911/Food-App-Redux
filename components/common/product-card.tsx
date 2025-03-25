import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@prisma/client";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="group relative flex flex-col items-center">
        <div>
          <Image
            className="group-hover:animate-wobble transition-all"
            src={product.image || "/placeholder-image.png"}
            alt={product.name || "Product image"}
            height={150}
            width={150}
          />
        </div>
        <div className="space-y-2 text-center ">
          <Link
            title={product.name}
            href={`/products/${product.slug}`}
            className="text-lg font-semibold block before:absolute before:inset-0 hover:text-primary transition-colors"
          >
            {product.name}
          </Link>
          <p
            aria-description={product.description}
            className="text-gray-500 max-w-[220px] line-clamp-1 break-words"
          >
            {product.description}
          </p>
          <span className="text-primary">${product.price}</span>
        </div>
      </div>

      <Button className="capitalize font-semibold mx-auto  text-xl ">
        Add to cart
      </Button>
    </div>
  );
}
