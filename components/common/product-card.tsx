import Image from "next/image";

import Link from "next/link";
import AddToCartDialog from "./add-to-cart-dialog";
import { ProductWithRelations } from "@/lib/types/product";
import { memo } from "react";
import { motion } from "motion/react";
export default memo(function ProductCard({
  product,
  productQty,
}: {
  product: ProductWithRelations;
  productQty: number;
}) {
  return (
    <motion.div className="flex flex-col items-center gap-4">
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
            className="text-lg font-semibold  before:absolute before:inset-0 hover:text-primary transition-colors line-clamp-2 word-break"
          >
            {product.name}
          </Link>
          <p
            aria-description={product.description}
            className="text-gray-500 line-clamp-2 h-[48px] word-break "
          >
            {product.description}
          </p>
          <span className="text-primary">${product.price}</span>
        </div>
      </div>

      <AddToCartDialog product={product} totalQty={productQty} />
    </motion.div>
  );
});
