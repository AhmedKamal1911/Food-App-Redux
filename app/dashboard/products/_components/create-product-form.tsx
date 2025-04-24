"use client";

import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

import CustomTextArea from "@/components/common/custom-text-area";
import { useCategoriesContext } from "@/providers/categories-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/lib/validation/create-product-schema";
import DropZoneViewer from "../../_components/drop-zone-viewer";
import { Trash2 } from "lucide-react";

import CustomInput from "@/components/common/custom-input";

import { PRODUCT_SIZES } from "@/lib/data";

export default function CreateProductForm() {
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: 0,
      categoryId: "",
      img: new File([], ""),
    },
    mode: "onChange",
  });
  const categories = useCategoriesContext();

  const [previewUrl, setPreviewUrl] = useState("");

  // 2. Define a submit handler.
  function onSubmit(values: CreateProductSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({ values });
    if (values.img) {
      // Handle the file upload here
      console.log("File to upload:", values.img);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2 max-h-[400px] overflow-y-scroll p-1">
          <DropZoneViewer
            control={form.control}
            name="img"
            onCloseImg={() => {
              setPreviewUrl("");
              form.setValue("img", new File([], ""));
            }}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            placeholder="drop your image"
          />

          <CustomInputField
            placeholder="enter product name"
            control={form.control}
            name="name"
            className="rounded-sm!"
          />
          <CustomInputField
            placeholder="enter product new price"
            control={form.control}
            name="price"
            className="rounded-sm!"
            type="number"
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-sm">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="sr-only">
                  Select a category for the product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <ProductSizes />

          <CustomTextArea
            placeholder="enter new product desc"
            name="desc"
            className="min-h-[100px] max-h-[150px] rounded-sm"
            control={form.control}
          />
        </div>
        <Button>Submit</Button>
      </form>
    </Form>
  );
}

function ProductSizes() {
  const { control, trigger, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  useEffect(() => {
    if (formState.isSubmitted && fields.length === 0) {
      trigger("sizes");
    }
  }, [fields.length, formState.isSubmitted, trigger]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Product Sizes</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-sm text-white font-semibold"
          onClick={() => {
            append({ name: "", price: 0 });
            trigger("sizes");
          }}
        >
          Add Size
        </Button>
      </div>

      {/* Validation Error for Sizes Array */}
      {formState.errors.sizes?.message && (
        <div className="text-sm text-destructive">
          {String(formState.errors.sizes.message)}
        </div>
      )}

      <div className="divide-y-1 space-y-1 px-2 max-h-[200px] overflow-y-scroll">
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-start py-2">
            {/* Select Size */}
            <FormField
              control={control}
              name={`sizes.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Size</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-sm">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODUCT_SIZES.map((size) => (
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

            {/* Price Field */}
            <div className="flex-1">
              <FormField
                control={control}
                name={`sizes.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Price</FormLabel>
                    <CustomInput
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Price"
                      type="number"
                      min={0}
                      className="rounded-sm"
                    />
                    <FormMessage className="text-red-500 mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Remove Button */}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => {
                remove(index);
                trigger("sizes"); // Always re-validate sizes
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
