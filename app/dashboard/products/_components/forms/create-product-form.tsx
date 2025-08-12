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
import { Dispatch, SetStateAction, useState } from "react";

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
  createProductSchema,
  CreateProductInputs,
} from "@/lib/validation/create-product-schema";

import { createProductAction } from "@/lib/server/actions/product/create-product-action";
import { toast } from "react-toastify";
import DropZoneViewer from "@/app/dashboard/_components/drop-zone-viewer";
import ProductSizesAccordion from "../product-sizes-accordion";
import ProductExtrasAccordion from "../product-extras-accordion";

export default function CreateProductForm({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<CreateProductInputs>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      desc: "",
      price: 0,
      categoryId: "",
      img: new File([], ""),
      sizes: [],
    },
    mode: "onChange",
  });
  const categories = useCategoriesContext();

  const [previewUrl, setPreviewUrl] = useState("");
  // 2. Define a submit handler.
  async function onSubmit(values: CreateProductInputs) {
    try {
      const res = await createProductAction({ ...values });
      if (res.success) {
        toast.success(res.message);
        setOpenModal(false);
      }
      if (!res.success && res.error.type === "error") {
        toast.error(res.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An Network error occured");
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
                      <SelectValue placeholder="Select Product Category" />
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
          {form.formState.isSubmitting ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
