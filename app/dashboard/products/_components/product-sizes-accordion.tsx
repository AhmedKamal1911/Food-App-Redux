import CustomInput from "@/components/common/custom-input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_SIZES } from "@/lib/data";
import { CreateProductInputs } from "@/lib/validation/create-product-schema";
import { Trash2 } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import CustomAccordionItem from "./custom-accordion-item";
import { SizeEnum } from "@prisma/client";

export default function ProductSizesAccordion() {
  const { control, watch } = useFormContext<CreateProductInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const sizesFields = watch("sizes");

  function onAddSize() {
    const newSize = PRODUCT_SIZES.find(
      (size) => !sizesFields.some((f) => f.name === size)
    );
    if (!newSize) return;
    append({
      name: newSize,
      price: 0,
    });
  }

  function onRemoveSize(index: number) {
    remove(index);
  }

  const getSizesSelectValues = (fieldValue: SizeEnum) =>
    PRODUCT_SIZES.filter(
      (size) => size === fieldValue || !sizesFields.some((f) => f.name === size)
    );

  return (
    <CustomAccordionItem title="Product Sizes">
      {fields.map((item, index) => (
        <SizeField
          key={item.id}
          control={control}
          index={index}
          onRemoveSize={onRemoveSize}
          getSizesSelectValues={getSizesSelectValues}
        />
      ))}
      {fields.length !== PRODUCT_SIZES.length && (
        <Button
          type="button"
          size="sm"
          className="rounded-sm font-semibold w-full"
          onClick={onAddSize}
        >
          + Add Size
        </Button>
      )}
    </CustomAccordionItem>
  );
}

type SizeFieldProps = {
  control: Control<CreateProductInputs>;
  index: number;

  onRemoveSize: (index: number) => void;

  getSizesSelectValues: (fieldValue: SizeEnum) => SizeEnum[];
};

function SizeField({
  control,

  getSizesSelectValues,
  index,
  onRemoveSize,
}: SizeFieldProps) {
  return (
    <div className="flex max-[350px]:flex-col max-[350px]:items-stretch gap-2 items-start border p-2 rounded-md bg-muted">
      {/* Size Select */}
      <FormField
        control={control}
        name={`sizes.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="sr-only">Size</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full rounded-sm bg-white">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {getSizesSelectValues(field.value).map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-500 mt-1" />
          </FormItem>
        )}
      />

      {/* Price Input */}
      <div className="flex-1">
        <FormField
          control={control}
          name={`sizes.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Price</FormLabel>
              <CustomInput
                {...field}
                onChange={(e) => {
                  const newPrice = Number(e.target.value);
                  field.onChange(newPrice);
                }}
                placeholder="Price"
                type="number"
                min={0}
                className="rounded-sm bg-white"
              />
              <FormMessage className="text-red-500 mt-1" />
            </FormItem>
          )}
        />
      </div>

      {/* Remove */}
      <Button
        className="max-[350px]:w-full"
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => onRemoveSize(index)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
