"use client";

import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { ProductCategory } from "@prisma/client";
import {
  UpdateCategoryInputs,
  updateCategorySchema,
} from "@/lib/validation/update-category-schema";
import { updateCategoryAction } from "@/lib/server/actions/category/update-category-action";
import DropZoneViewer from "@/app/dashboard/_components/drop-zone-viewer";
type Props = {
  category: ProductCategory;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
export default function UpdateCategoryForm({ category, setOpenModal }: Props) {
  const form = useForm<UpdateCategoryInputs>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      img: undefined,
    },
    mode: "onChange",
  });

  const [previewUrl, setPreviewUrl] = useState(
    category.image ?? "/images/decorations/placeholder.png"
  );

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateCategoryInputs) {
    try {
      const res = await updateCategoryAction(values);
      if (res.status === "success") {
        toast.success(res.message);
        setOpenModal(false);
      }
      if (res.status === "validationError") return;
      if (res.status === "error") {
        toast.error(res.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error Occurred");
    }
  }

  useEffect(() => {
    form.reset({
      id: category.id,
      name: category.name,
    });
  }, [category, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          placeholder="enter Category name"
          control={form.control}
          name="name"
          className="rounded-sm!"
        />

        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Updating" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
