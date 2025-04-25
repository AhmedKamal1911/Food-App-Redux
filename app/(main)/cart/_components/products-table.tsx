import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuantityBox from "./quantity-box";
import { CartProduct } from "@/lib/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useProductTotalPrice } from "@/hooks/use-product-total-price";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  changeCartItemQty,
  decrementCartItemQty,
  deleteCartItem,
  incrementCartItemQty,
} from "@/lib/redux/features/cart/cartSlice";
import { memo } from "react";
import { Extra } from "@prisma/client";
const MemoizedProductRow = memo(
  function ProductRow({ product }: { product: CartProduct }) {
    const dispatch = useAppDispatch();
    console.log(`row rerenders ${product.name}`);
    function onIncrementClick() {
      dispatch(
        incrementCartItemQty({
          extrasIds: product.selectedExtras.map((e) => e.id),
          id: product.id,
          sizeId: product.selectedSize?.id,
        })
      );
    }
    function onDecrementClick() {
      dispatch(
        decrementCartItemQty({
          extrasIds: product.selectedExtras.map((e) => e.id),
          id: product.id,
          sizeId: product.selectedSize?.id,
        })
      );
    }
    function onQtyChange(qty: number) {
      dispatch(
        changeCartItemQty({
          extrasIds: product.selectedExtras.map((e) => e.id),
          id: product.id,
          sizeId: product.selectedSize?.id,
          qty,
        })
      );
    }

    function onDeleteCartProduct() {
      dispatch(
        deleteCartItem({
          id: product.id,
          extrasIds: product.selectedExtras.map((ext) => ext.id),
          sizeId: product.selectedSize?.id,
        })
      );
    }
    return (
      <TableRow className="hover:bg-transparent">
        <TableCell className="pe-15">
          <Product product={product} onDeleteProduct={onDeleteCartProduct} />
        </TableCell>
        <TableCell className="w-[25%] text-center">
          <QuantityBox
            value={product.qty}
            onQtyChange={onQtyChange}
            onIncrease={onIncrementClick}
            onDecrease={onDecrementClick}
          />
        </TableCell>
        <TableCell className="w-[25%] text-center text-[18px] font-semibold">
          ${product.price}
        </TableCell>
        <ProductTotalPriceCell product={product} />
      </TableRow>
    );
  },
  (prev, next) => {
    console.log({ prevQty: prev.product.qty, nextQty: next.product.qty });
    return prev.product.qty === next.product.qty;
  }
);
export default function ProductsTable({
  products,
}: {
  products: CartProduct[];
}) {
  return (
    <Table className="min-w-[650px]">
      <TableCaption>A list of your cart products.</TableCaption>
      <TableHeader>
        <TableRow className="uppercase hover:bg-transparent text-[18px]">
          <TableHead className="text-gray-500 font-semibold">
            product details
          </TableHead>
          <TableHead className="text-gray-500 font-semibold text-center">
            quantity
          </TableHead>
          <TableHead className="text-gray-500 font-semibold text-center">
            price
          </TableHead>
          <TableHead className="text-gray-500 font-semibold text-center">
            total
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length > 0 ? (
          products.map((product, i) => (
            <MemoizedProductRow key={`${product.id}_${i}`} product={product} />
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell className="w-[40%] lg:w-[30%]">no products</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function Product({
  product,
  onDeleteProduct,
}: {
  product: CartProduct;
  onDeleteProduct: () => void;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col  justify-center gap-5 shrink-0">
        <div className="bg-gray-100 rounded-sm ">
          <Image
            src={"/images/special-products/burger.png"}
            alt="product"
            height={90}
            width={90}
            className="object-cover self-center aspect-square"
          />
        </div>
        <Button
          onClick={onDeleteProduct}
          variant={"destructive"}
          className=" font-semibold  hover:bg-rose-900 text-white  rounded-sm h-auto p-1"
        >
          Remove
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-semibold capitalize text-[18px]">
          {product.name}
        </span>
        {product.category && (
          <span className="font-semibold capitalize text-rose-600">
            <span className="font-semibold text-gray-700">category :</span>{" "}
            {product.category.name}
          </span>
        )}
        {product.selectedSize && (
          <div className="flex gap-3">
            <span className="font-semibold text-gray-700">Product Size :</span>
            <span className="text-sky-700 font-semibold">
              {product.selectedSize.name}
            </span>
            <span className="text-rose-500 font-semibold">
              ${product.selectedSize.price}
            </span>
          </div>
        )}

        {product.selectedExtras.length > 0 && (
          <ExtrasList selectedExtras={product.selectedExtras} />
        )}
      </div>
    </div>
  );
}

function ExtrasList({ selectedExtras }: { selectedExtras: Extra[] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-gray-700">Selected Extras:</span>
      <ul className="ml-2 list-disc text-sm text-gray-600">
        {selectedExtras.map((extra) => (
          <li key={extra.id} className="flex gap-3 ">
            <span className="capitalize text-green-700 font-semibold">
              {extra.name}
            </span>
            <span className="text-rose-600 font-medium">${extra.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductTotalPriceCell({ product }: { product: CartProduct }) {
  const totalProductPrice = useProductTotalPrice({
    productPrice: product.price,
    selectedExtras: product.selectedExtras,
    selectedSize: product.selectedSize,
    qty: product.qty,
  });
  return (
    <TableCell className="w-[25%] text-center text-[18px] font-semibold">
      ${totalProductPrice}
    </TableCell>
  );
}
