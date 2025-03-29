"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Button } from "../ui/button";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Extra, Size } from "@prisma/client";
import Image from "next/image";
import { ProductWithRelations } from "@/lib/types/product";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { toast } from "react-toastify";
type SelectedOptionsState = {
  size: Size;
  extras: Extra[];
};
export default function AddToCartDialog({
  product,
}: {
  product: ProductWithRelations;
}) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>(
    () => ({
      size:
        product.sizes.find(({ name }) => name === "Medium") ?? product.sizes[0],
      extras: [],
    })
  );
  const [totalProductPrice, setTotalProductPrice] = useState(product.price);
  const selectedOptionsUpdater = (o: Partial<SelectedOptionsState>) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, ...o };

      const selectedSize = updatedOptions.size ?? prev.size;
      const sizePrice = selectedSize.name === "Medium" ? 0 : selectedSize.price;
      console.log({ sizePrice });

      const selectedExtras = updatedOptions.extras ?? prev.extras;
      const extrasPrice = selectedExtras.reduce(
        (sum, extra) => sum + extra.price,
        0
      );

      const newTotalPrice = product.price + sizePrice + extrasPrice;

      setTotalProductPrice(newTotalPrice);
      return updatedOptions;
    });
  };
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalQuantity =
    cartProducts[product.id]?.reduce((acc, curr) => acc + curr.qty, 0) ?? 0;
  // OPTIMIZE: Lift state up and memoized product to improve performance
  const dispatch = useAppDispatch();
  function addProductToCart() {
    dispatch(
      addToCart({
        id: product.id,
        sizeId: selectedOptions.size.id,
        extrasIds: selectedOptions.extras.map((extra) => extra.id),
      })
    );
    toast.success(`${product.name} Added To Cart`);
  }

  console.log("renders", totalQuantity);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="capitalize font-semibold text-xl ">
          Add to cart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  rounded-sm ">
        <DialogHeader className="text-center">
          <div className="self-center relative">
            <Image
              src={product.image}
              height={100}
              width={100}
              alt={product.name}
            />
          </div>
          <DialogTitle className="text-center line-clamp-2 word-break">
            {product.name}
          </DialogTitle>
          <span className="text-center font-semibold text-primary ">
            ${product.price}
          </span>
          <DialogDescription className="text-center line-clamp-3">
            {product.description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-scroll p-2 space-y-3">
          {product.sizes.length > 0 && (
            <PickSizeRadio
              selectedSize={selectedOptions.size}
              onSizeChange={(size) => selectedOptionsUpdater({ size })}
              sizesList={product.sizes}
            />
          )}

          {product.extras.length > 0 && (
            <PickExtraRadio
              selectedExtras={selectedOptions.extras}
              onExtraChange={(extras) => selectedOptionsUpdater({ extras })}
              extrasList={product.extras}
            />
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={addProductToCart}
            className="capitalize font-semibold w-full bg-orange-600 hover:bg-orange-600/90"
          >
            {cartProducts[product.id]?.length > 0
              ? `Add to cart (${totalQuantity})`
              : `Add to cart ($${totalProductPrice.toFixed(2)})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PickSizeRadio({
  sizesList,
  selectedSize,
  onSizeChange,
}: {
  sizesList: Size[];
  selectedSize: Size;
  onSizeChange: (size: Size) => void;
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
        defaultValue={selectedSize.name}
        className="flex flex-col  gap-1"
      >
        {sizesList.map((size) => (
          <div
            key={size.id}
            className={`flex items-center border-1 relative rounded-sm p-2  ${
              selectedSize.name === size.name
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

function PickExtraRadio({
  extrasList,
  selectedExtras,
  onExtraChange,
}: {
  extrasList: Extra[];
  selectedExtras: Extra[];
  onExtraChange: (extras: Extra[]) => void;
}) {
  return (
    <div>
      <span className="font-semibold block mb-3">
        Pick up Your Product Size :
      </span>

      <div className="flex flex-col space-y-2">
        {extrasList.map((extra) => (
          <div
            key={extra.id}
            className={
              "items-top flex space-x-2 border-1 p-2 rounded-sm relative"
            }
          >
            <Checkbox
              id={extra.id}
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
            />

            <Label
              htmlFor={extra.id}
              className="font-semibold flex-1 before:absolute before:inset-0 cursor-pointer"
            >
              {extra.name}
              <span className="text-red-500">${extra.price}</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
