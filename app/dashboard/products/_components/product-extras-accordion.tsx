import CustomInput from "@/components/common/custom-input";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PRODUCT_SIZES } from "@/lib/data";
import { CreateProductInputs } from "@/lib/validation/create-product-schema";
import { Trash2 } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import CustomAccordionItem from "./custom-accordion-item";

export default function ProductExtrasAccordion() {
  const { control } = useFormContext<CreateProductInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "extras",
  });

  function onAddExtra() {
    append({
      name: "",
      price: 0,
    });
  }
  function onRemoveExtra(index: number) {
    remove(index);
  }

  return (
    <CustomAccordionItem title="Product Extras">
      {fields.map((item, index) => (
        <ExtraField
          key={item.id}
          control={control}
          index={index}
          onRemoveExtra={onRemoveExtra}
        />
      ))}
      {fields.length !== PRODUCT_SIZES.length && (
        <Button
          type="button"
          size="sm"
          className="rounded-sm font-semibold w-full"
          onClick={onAddExtra}
        >
          + Add Extras
        </Button>
      )}
    </CustomAccordionItem>
  );
}

type ExtraFieldProps = {
  control: Control<CreateProductInputs>;

  index: number;
  onRemoveExtra: (index: number) => void;
};

function ExtraField({
  control,

  index,
  onRemoveExtra,
}: ExtraFieldProps) {
  return (
    <div className="flex gap-2 items-start border p-2 rounded-md bg-muted">
      <FormField
        control={control}
        name={`extras.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="sr-only">Name</FormLabel>
            <CustomInput
              {...field}
              placeholder="name"
              className="rounded-sm bg-white"
            />
            <FormMessage className="text-red-500 mt-1" />
          </FormItem>
        )}
      />

      {/* Price Input */}
      <div className="flex-1">
        <FormField
          control={control}
          name={`extras.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Price</FormLabel>
              <CustomInput
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
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
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => onRemoveExtra(index)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
