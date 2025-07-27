import { AlertCircle, LoaderCircle, ShoppingBag, X } from "lucide-react";
import { SubMenuContainer } from ".";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartProductsSubtotal } from "@/hooks/use-cart-products-subtotal";
import { useGetCartProducts } from "@/hooks/use-get-cart-products";
import { CartProduct } from "@/lib/types/product";
import { useCartProductsCount } from "@/hooks/use-cart-products-count";
import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteCartItem } from "@/lib/redux/features/cart/cartSlice";
import { toast } from "react-toastify";

export default function ShoppingCartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartProducts, error, isLoading } = useGetCartProducts();
  const itemsCount = useCartProductsCount();
  const subtotal = useCartProductsSubtotal(cartProducts);
  return (
    <div>
      <div className="group max-lg:hidden">
        <ShoppingCartButton
          error={error}
          isLoading={isLoading}
          itemsCount={itemsCount}
          subtotal={subtotal}
        />
        {!error && (
          <SubMenuContainer className=" py-3 px-2 max-sm:start-0 end-0 sm:end-10 xl:end-0 sm:w-[300px]  max-w-full lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0">
            <ShoppingCartMenuContent
              error={error}
              isLoading={isLoading}
              itemsCount={itemsCount}
              subtotal={subtotal}
              cartProducts={cartProducts}
            />
          </SubMenuContainer>
        )}
      </div>

      <ShoppingCartButton
        error={error}
        isLoading={isLoading}
        itemsCount={itemsCount}
        subtotal={subtotal}
        className="max-lg:flex lg:hidden"
        onClick={() => {
          if (error) return;
          setIsOpen((prev) => !prev);
        }}
      />
      {!error && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="right"
            className="items-start justify-center z-[999] p-4 "
          >
            <SheetTitle>Shopping Cart</SheetTitle>
            <ShoppingCartMenuContent
              error={error}
              isLoading={isLoading}
              itemsCount={itemsCount}
              subtotal={subtotal}
              cartProducts={cartProducts}
            />
            <SheetDescription className="sr-only">
              Review the items in your cart before proceeding to checkout.
            </SheetDescription>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

function ShoppingCartButton({
  subtotal,
  onClick,
  className,
  itemsCount,
  isLoading,
  error,
}: {
  subtotal: number;
  onClick?: () => void;
  className?: string;
  itemsCount: number;
  isLoading: boolean;
  error: Error | null;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex  py-6 items-center gap-1.5 text-white cursor-pointer ",
        className
      )}
    >
      <div className="relative">
        <ShoppingBag className="text-primary size-6 sm:size-6" />
        {error && (
          <AlertCircle className="text-rose-700 size-4 absolute start-1/2 -translate-x-1/2 bottom-full mb-0.5" />
        )}
      </div>

      <span className="flex items-center gap-1 max-[720px]:hidden">
        {itemsCount} items -
        {isLoading ? (
          <span>
            <LoaderCircle className="size-5 text-primary animate-spin" />
          </span>
        ) : (
          subtotal
        )}
      </span>
    </button>
  );
}

function ShoppingCartMenuContent({
  cartProducts,
  subtotal,
  itemsCount,
  error,
  isLoading,
}: {
  cartProducts: CartProduct[];
  subtotal: number;
  itemsCount: number;
  error: Error | null;
  isLoading: boolean;
}) {
  // FIXME: the un neccessary renderd
  return (
    <div className="relative  w-full flex flex-col">
      <div className=" text-center text-xl font-semibold relative pb-3 before:absolute before:h-0.5 before:w-[32%] before:bg-gray-300 before:start-2 before:top-1/2 before:-translate-y-1/2 before:rounded-1/2 after:absolute after:h-0.5 after:w-[32%] after:bg-gray-300 after:end-2 after:top-1/2 after:-translate-y-1/2 after:rounded-1/2">
        {itemsCount} items
      </div>
      {/* TODO: refactor and move this logic into a separate component */}
      <ScrollArea className="h-[700px] lg:h-[250px] pr-3">
        {error ? (
          <span className="text-red-500 text-xl text-center">Error</span>
        ) : itemsCount === 0 ? (
          <span className="block text-center py-3">
            No Products in the cart
          </span>
        ) : isLoading ? (
          <span className="text-green-500 text-xl">Loading</span>
        ) : (
          <ul className="flex flex-col gap-3 divide-y divide-gray-200">
            {cartProducts.map((product, i) => (
              <li key={`${product.id}_${i}`}>
                <MemoizedCartProductBox product={product} />
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>

      <div className=" border-t border-t-gray-200 pt-3 mt-3">
        <div className="flex justify-between items-center gap-3 text-[#999999] font-semibold mb-3">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex gap-2 justify-center items-center text-[#999999] font-semibold">
          <Link
            href={"/cart"}
            className="text-white rounded-4xl border bg-secondary hover:bg-white hover:text-secondary border-secondary hover:border-secondary py-2 px-4 transition-all"
          >
            View Cart & Checkout
          </Link>
          {/* <Link
            href={"/cart"}
            className="rounded-4xl bg-primary border border-primary hover:bg-white hover:text-primary text-white py-2 px-4 transition-all"
          >
            Checkout
          </Link> */}
        </div>
      </div>
    </div>
  );
}

const MemoizedCartProductBox = memo(function CartProductBox({
  product,
}: {
  product: CartProduct;
}) {
  return (
    <div className="flex items-center">
      <Image
        src={product.image ?? "https://placehold.co/600x400.png"}
        alt={product.name}
        width={80}
        height={80}
      />
      <div className="flex flex-col gap-1 flex-1 px-4">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 word-break"
          title={product.name}
        >
          {product.name}
        </Link>
        <span className="text-primary">
          {product.qty} x ${product.price}
        </span>
      </div>
      <DeleteProductButton product={product} />
    </div>
  );
});

function DeleteProductButton({ product }: { product: CartProduct }) {
  const dispatch = useAppDispatch();
  function onProductDelete() {
    dispatch(
      deleteCartItem({
        extrasIds: product.selectedExtras.map((ext) => ext.id),
        id: product.id,
        sizeId: product.selectedSize?.id,
      })
    );
    toast.success(`${product.name} Deleted From Cart`);
  }
  return (
    <button
      onClick={onProductDelete}
      className="self-start cursor-pointer hover:bg-primary/10 transition-colors"
    >
      <X className="text-red-600" />
    </button>
  );
}
