import { AlertCircle, LoaderCircle, ShoppingBag } from "lucide-react";
import { SubMenuContainer } from ".";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { useCartProductsSubtotal } from "@/hooks/use-cart-products-subtotal";
import { useGetCartProducts } from "@/hooks/use-get-cart-products";
import { CartProduct } from "@/lib/types/product";
import { useCartProductsCount } from "@/hooks/use-cart-products-count";

import CartMenuScrollArea from "./cart-menu-scroll-area";

export default function ShoppingCartMenu() {
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

      <ShoppingCartDrawer
        cartProducts={cartProducts}
        error={error}
        isLoading={isLoading}
        itemsCount={itemsCount}
        subtotal={subtotal}
      />
    </div>
  );
}

type ShoppingCartDrawerProps = {
  cartProducts: CartProduct[];
  subtotal: number;
  itemsCount: number;
  error: Error | null;
  isLoading: boolean;
};
function ShoppingCartDrawer({
  cartProducts,
  error,
  isLoading,
  itemsCount,
  subtotal,
}: ShoppingCartDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShoppingCartButton
          error={error}
          isLoading={isLoading}
          itemsCount={itemsCount}
          subtotal={subtotal}
          className="max-lg:flex lg:hidden"
        />
      </SheetTrigger>
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
        {itemsCount} items <span>-</span>
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

type ShoppingCartMenuContentProps = {
  cartProducts: CartProduct[];
  subtotal: number;
  itemsCount: number;
  error: Error | null;
  isLoading: boolean;
};
function ShoppingCartMenuContent({
  cartProducts,
  subtotal,
  itemsCount,
  error,
  isLoading,
}: ShoppingCartMenuContentProps) {
  return (
    <div className="relative w-full flex flex-col">
      <div className=" text-center text-xl font-semibold relative pb-3 before:absolute before:h-0.5 before:w-[32%] before:bg-gray-300 before:start-2 before:top-1/2 before:-translate-y-1/2 before:rounded-1/2 after:absolute after:h-0.5 after:w-[32%] after:bg-gray-300 after:end-2 after:top-1/2 after:-translate-y-1/2 after:rounded-1/2">
        {itemsCount} items
      </div>

      <CartMenuScrollArea
        cartProducts={cartProducts}
        itemsCount={itemsCount}
        isLoading={isLoading}
        error={error}
      />

      <div className=" border-t border-t-gray-200 pt-3 mt-3">
        <div className="flex justify-between items-center gap-3 text-[#999999] font-semibold mb-3">
          <span>Subtotal</span>
          {isLoading ? (
            <span className="animate-pulse rounded-[2px] w-[50px] p-2 bg-gray-400 inline-block" />
          ) : (
            <span>${subtotal}</span>
          )}
        </div>
        <div className="flex gap-2 justify-center items-center text-[#999999] font-semibold">
          <Link
            href={"/cart"}
            className="text-white rounded-4xl border bg-secondary hover:bg-white hover:text-secondary border-secondary hover:border-secondary py-2 px-4 transition-all"
          >
            View Cart & Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
