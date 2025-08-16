"use client";
import { Button } from "../ui/button";
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

import { useProductOptions } from "@/hooks/use-product-options";

export default function AddToCartDialog({
  product,
}: {
  product: ProductWithRelations;
}) {
  const {
    selectedOptions,
    selectedOptionsUpdater,
    totalProductPrice,
    addProductToCart,
    totalQuantity,
  } = useProductOptions(product);

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
              src={product.image ?? "/images/decorations/placeholder.png"}
              height={100}
              width={100}
              alt={product.name ?? "product image placeholder"}
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

        {product.sizes.length > 0 && product.extras.length > 0 && (
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
        )}

        <DialogFooter>
          <Button
            onClick={addProductToCart}
            className="capitalize font-semibold w-full bg-orange-600 hover:bg-orange-600/90"
          >
            {totalQuantity > 0
              ? `Add to cart (${totalQuantity})`
              : `Add to cart ($${totalProductPrice})`}
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
