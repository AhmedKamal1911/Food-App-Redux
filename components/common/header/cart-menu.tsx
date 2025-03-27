import { ShoppingBag, X } from "lucide-react";
import { SubMenuContainer } from ".";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";

export default function ShoppingCartMenu({
  products,
}: {
  products: Product[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="group max-lg:hidden">
        <ShoppingCartButton />
        <SubMenuContainer className="p-4 max-sm:start-0 end-0 sm:end-10 xl:end-0 sm:w-[300px]  max-w-full lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0">
          <ShoppingCartMenuContent products={products} />
        </SubMenuContainer>
      </div>

      <ShoppingCartButton
        className="max-lg:flex lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="items-start justify-center z-[999] p-4 "
        >
          <SheetTitle>Shopping Cart</SheetTitle>
          <ShoppingCartMenuContent products={products} />
          <SheetDescription className="sr-only">
            Review the items in your cart before proceeding to checkout.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ShoppingCartButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex  py-6 items-center gap-1.5 text-white cursor-pointer ",
        className
      )}
    >
      <ShoppingBag className="text-primary size-6 sm:size-6" />
      <span className="max-[660px]:hidden">0 items - $0.00</span>
    </button>
  );
}

function ShoppingCartMenuContent({ products }: { products: Product[] }) {
  return (
    <div className="overflow-y-auto lg:max-h-[400px] w-full">
      <span className="text-center block text-xl font-semibold relative before:absolute before:h-0.5 before:w-[32%] before:bg-gray-300 before:start-2 before:top-1/2 before:-translate-y-1/2 before:rounded-1/2  after:absolute after:h-0.5 after:w-[32%] after:bg-gray-300 after:end-2 after:top-1/2 after:-translate-y-1/2 after:rounded-1/2 ">
        {products.length} items
      </span>

      <ul className="flex flex-col gap-3 divide-y-1 divide-gray-200">
        {products.map((product) => (
          <li key={product.id}>
            <CartProduct product={product} />
          </li>
        ))}
        {products.map((product) => (
          <li key={product.id}>
            <CartProduct product={product} />
          </li>
        ))}
      </ul>
      {products.length === 0 ? (
        <span className="text-center block py-3">No Products in the cart</span>
      ) : (
        <>
          <div className="flex justify-between items-center gap-3 border-t-1 border-t-gray-200 py-3 text-[#999999] font-semibold">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>

          <div className="flex gap-2 justify-center items-center mt-2  text-[#999999] font-semibold">
            <Link
              href={"/cart"}
              className="text-white rounded-4xl border bg-secondary hover:bg-white hover:text-secondary border-secondary hover:border-secondary  py-2 px-4 transition-all"
            >
              View Cart
            </Link>
            <Link
              href={"/checkout"}
              className="rounded-4xl bg-primary border border-primary hover:bg-white hover:text-primary text-white py-2 px-4 transition-all"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function CartProduct({ product }: { product: Product }) {
  return (
    <div className="flex items-center">
      <Image src={product.image} alt={product.name} width={80} height={80} />
      <div className="flex flex-col gap-1 flex-1 px-4">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 word-break"
          title={product.name}
        >
          {product.name}
        </Link>
        <span className="text-primary">1 x ${product.price}</span>
      </div>
      <button className="self-start cursor-pointer hover:bg-primary/10 transition-colors">
        <X className="text-red-600" />
      </button>
    </div>
  );
}
