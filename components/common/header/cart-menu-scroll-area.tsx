import { ScrollArea } from "@/components/ui/scroll-area";
import { CartProduct } from "@/lib/types/product";

import { deleteCartItem } from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { toast } from "react-toastify";

type Props = {
  cartProducts: CartProduct[];
  itemsCount: number;
  error: Error | null;
  isLoading: boolean;
};
export default function CartMenuScrollArea({
  isLoading,
  error,
  itemsCount,
  cartProducts,
}: Props) {
  return (
    <ScrollArea className=" pr-3 h-[700px] lg:h-[260px]">
      {error ? (
        <CartMenuStatusBox status="error" message={error.message} />
      ) : itemsCount === 0 ? (
        <CartMenuStatusBox status="empty" message="no products in the cart" />
      ) : isLoading ? (
        <CartMenuItemsSkeleton />
      ) : (
        <CartMenuList cartProducts={cartProducts} />
      )}
    </ScrollArea>
  );
}

function CartMenuList({ cartProducts }: { cartProducts: CartProduct[] }) {
  return (
    <ul className="flex flex-col gap-3 divide-y divide-gray-200">
      {cartProducts.map((product, i) => (
        <li key={`${product.id}_${i}`}>
          <MemoizedCartProductBox product={product} />
        </li>
      ))}
    </ul>
  );
}

const MemoizedCartProductBox = memo(function CartProductBox({
  product,
}: {
  product: CartProduct;
}) {
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
    <div className="flex flex-col-reverse gap-2 sm:gap-1 p-1 sm:p-3 border-b items-start">
      <Image
        src={product.image ?? "/images/decorations/placeholder.png"}
        alt={product.name ?? "product image placeholder"}
        width={80}
        height={80}
        className="rounded-md object-cover flex-shrink-0"
      />

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* اسم المنتج */}
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 break-words font-medium"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* السعر */}
        <span className="text-primary font-semibold">
          {product.qty} x ${product.price}
        </span>
        {product.selectedSize && (
          <div className="flex gap-2">
            <span>Size:</span>
            <span className="font-semibold">{product.selectedSize.name}</span>
          </div>
        )}
        {/* Extras */}
        {product.selectedExtras?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.selectedExtras.map((extra) => (
              <span
                key={extra.id}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700 flex items-center gap-1"
              >
                {extra.name} +{extra.price}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onProductDelete}
        className="cursor-pointer hover:bg-red-50 transition-colors rounded-full p-1"
      >
        <X className="text-red-600 w-5 h-5" />
      </button>
    </div>
  );
});

function CartMenuItemsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="animate-pulse rounded-sm bg-gray-400 size-20" />
          <div className="flex flex-col gap-1 flex-1 px-4">
            <span className="animate-pulse rounded-sm w-[100px] p-1 bg-gray-400 inline-block" />
            <span className="animate-pulse rounded-sm w-[100px] p-1 bg-gray-400 inline-block" />
            <span className="animate-pulse rounded-sm w-[50px] p-1 bg-gray-400 inline-block" />
          </div>
          <div className="self-start rounded-[2px] animate-pulse bg-rose-400 size-4" />
        </div>
      ))}
    </div>
  );
}

import { ShoppingBag, TriangleAlert } from "lucide-react";

export function CartMenuStatusBox({
  status,
  message,
}: {
  status: "error" | "empty";
  message: string;
}) {
  return (
    <div className="flex flex-col gap-2 min-h-[250px] items-center justify-center ">
      {status !== "error" ? (
        <ShoppingBag className="size-15 text-primary" />
      ) : (
        <TriangleAlert className="size-15 text-red-500" />
      )}

      <span className="block text-center font-bold text-xl capitalize">
        {message}
      </span>
    </div>
  );
}
