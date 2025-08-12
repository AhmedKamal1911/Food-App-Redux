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
import { useForm } from "react-hook-form";

import { ProductWithRelations } from "@/lib/types/product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  UpdateProductInputs,
  updateProductSchema,
} from "@/lib/validation/update-product-schema";
import CustomTextArea from "@/components/common/custom-text-area";
import { useCategoriesContext } from "@/providers/categories-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateProductAction } from "@/lib/server/actions/product/update-product-action";
import { toast } from "react-toastify";
import DropZoneViewer from "@/app/dashboard/_components/drop-zone-viewer";
import ProductSizesAccordion from "../product-sizes-accordion";
import ProductExtrasAccordion from "../product-extras-accordion";
type Props = {
  product: ProductWithRelations;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export default function UpdateProductForm({ product, setOpenModal }: Props) {
  const form = useForm<UpdateProductInputs>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      desc: product.description,
      price: product.price,
      categoryId: product?.categoryId ?? "",
      sizes: product.sizes,
      extras: product.extras,
    },
    mode: "onChange",
  });

  const categories = useCategoriesContext();

  const [previewUrl, setPreviewUrl] = useState(
    product.image ?? "https://placehold.co/600x400.png"
  );
  // 2. Define a submit handler.
  async function onSubmit(values: UpdateProductInputs) {
    try {
      const res = await updateProductAction(values);
      if (res.success) {
        toast.success(res.message);
        setOpenModal(false);
      }
      if (!res.success && res.error.type === "error") {
        toast.error(res.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error Occurred");
    }
  }

  useEffect(() => {
    form.reset({
      categoryId: product?.categoryId ?? "",
      desc: product.description,
      extras: product.extras,
      id: product.id,
      name: product.name,
      price: product.price,
      sizes: product.sizes,
    });
  }, [product, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2 max-h-[400px] overflow-y-scroll p-2">
          <DropZoneViewer
            control={form.control}
            name="img"
            onCloseImg={() => {
              setPreviewUrl("");
              form.setValue("img", undefined); // Reset the file input
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
          <ProductSizesAccordion />
          <ProductExtrasAccordion />
          <CustomTextArea
            placeholder="enter new product desc"
            name="desc"
            className="min-h-[100px] max-h-[150px] rounded-sm"
            control={form.control}
          />
        </div>
        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Updating" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
