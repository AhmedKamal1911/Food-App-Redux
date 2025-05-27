"use client";
import QuantityBox from "@/app/(main)/cart/_components/quantity-box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductOptions } from "@/hooks/use-product-options";
import {
  changeCartItemQty,
  decrementCartItemQty,
  incrementCartItemQty,
} from "@/lib/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ProductWithRelations } from "@/lib/types/product";
import { Extra, Size } from "@prisma/client";
import clsx from "clsx";

type Props = {
  product: ProductWithRelations;
};
export default function ProductInfoBox({ product }: Props) {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalQuantity =
    cartProducts[product.id]?.reduce((acc, curr) => acc + curr.qty, 0) ?? 0;
  const {
    selectedOptions,
    selectedOptionsUpdater,
    totalProductPrice,
    addProductToCart,
  } = useProductOptions(product);

  function onIncrementClick() {
    dispatch(
      incrementCartItemQty({
        extrasIds: selectedOptions.extras.map((e) => e.id),
        id: product.id,
        sizeId: selectedOptions.size?.id,
      })
    );
  }
  function onDecrementClick() {
    dispatch(
      decrementCartItemQty({
        extrasIds: selectedOptions.extras.map((e) => e.id),
        id: product.id,
        sizeId: selectedOptions.size?.id,
      })
    );
  }
  function onQtyChange(qty: number) {
    dispatch(
      changeCartItemQty({
        extrasIds: selectedOptions.extras.map((e) => e.id),
        id: product.id,
        sizeId: selectedOptions.size?.id,
        qty,
      })
    );
  }
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{product.name}</span>
        <p className="text-gray-700">{product.description}</p>
      </div>
      <div className="flex flex-col divide-y-2 gap-2">
        <div className="flex flex-col gap-2 py-3">
          <p className="text-lg font-semibold ">
            Price:{" "}
            <span className="text-green-600">${product.price.toFixed(2)}</span>
          </p>
          <p className="text-lg font-semibold ">
            Category:{" "}
            <span className="text-white bg-rose-500 p-1 rounded-sm">
              {product.category?.name}
            </span>
          </p>
          {product.extras.length > 0 && (
            <PickExtrasList
              selectedExtras={selectedOptions.extras}
              onExtraChange={(extras) => selectedOptionsUpdater({ extras })}
              extras={product.extras}
            />
          )}
        </div>
        {product.extras.length > 0 && (
          <PickSizeRadio
            onSizeChange={(size) => selectedOptionsUpdater({ size })}
            selectedSize={selectedOptions.size}
            sizesList={product.sizes}
          />
        )}
      </div>
      <div>
        <span className="text-gray-700 font-semibold">Quantity:</span>
        <QuantityBox
          onDecrease={onDecrementClick}
          onIncrease={onIncrementClick}
          onQtyChange={onQtyChange}
          value={totalQuantity}
        />
      </div>

      <Button
        onClick={addProductToCart}
        className="capitalize font-semibold w-full bg-orange-600 hover:bg-orange-600/90"
      >
        {totalQuantity > 0
          ? `Add to cart (${totalQuantity})`
          : `Add to cart ($${totalProductPrice})`}
      </Button>
    </div>
  );
}

function PickExtrasList({
  extras,
  onExtraChange,
  selectedExtras,
}: {
  extras: Extra[];
  onExtraChange: (extras: Extra[]) => void;

  selectedExtras: Extra[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-gray-700 font-semibold">Extras:</span>
      {extras.map((extra) => (
        <div key={extra.id} className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={() =>
              onExtraChange(
                selectedExtras.find(
                  (selectedExtra) => selectedExtra.id === extra.id
                )
                  ? selectedExtras.filter(
                      (selectedExtra) => selectedExtra.id !== extra.id
                    )
                  : [...selectedExtras, extra]
              )
            }
            className="hidden"
            id={extra.id}
          />
          <label
            htmlFor={extra.id}
            className={clsx(
              {
                "bg-primary/30 text-black hover:bg-gray-200 hover:text-rose-800":
                  selectedExtras.some((e) => e.id === extra.id),
                "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-800":
                  !selectedExtras.some((e) => e.id === extra.id),
              },
              "text-sm cursor-pointer select-none font-semibold border-2 border-gray-500 p-1.5 rounded-sm transition-colors"
            )}
          >
            <span>{extra.name}</span>
            <span className="text-rose-700"> +${extra.price.toFixed(2)}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

function PickSizeRadio({
  sizesList,
  selectedSize,
  onSizeChange,
}: {
  sizesList: Size[];
  selectedSize: Size | undefined;
  onSizeChange: (size: Size | undefined) => void;
}) {
  return (
    <div>
      <span className="font-semibold block mb-3">
        Pick up Your Product Size :
      </span>

      <RadioGroup
        onValueChange={(sizeValue: string) =>
          onSizeChange(
            sizesList.find((size) => size.name === sizeValue) ?? selectedSize
          )
        }
        defaultValue={selectedSize?.name}
        className="flex flex-col  gap-1"
      >
        {sizesList.map((size) => (
          <div
            key={size.id}
            className={`flex items-center border-1 relative rounded-sm p-2  ${
              selectedSize?.name === size.name
                ? "ring-2 ring-primary/30 border-primary/70 transition-all"
                : ""
            }`}
          >
            <RadioGroupItem value={size.name} id={size.id} />
            <Label
              htmlFor={size.id}
              className="font-semibold flex-1 pl-2 before:absolute before:inset-0 cursor-pointer"
            >
              {size.name}
              <span className="text-red-500">${size.price}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
