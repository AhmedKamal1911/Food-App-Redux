"use client";

import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { toast } from "react-toastify";
import {
  CreateCategoryInputs,
  createCategorySchema,
} from "@/lib/validation/create-category-schema";
import { createCategory } from "@/lib/server/actions/category/create-category";
import DropZoneViewer from "@/app/dashboard/_components/drop-zone-viewer";
// TODO: build auth role
export default function CreateCategoryForm() {
  const form = useForm<CreateCategoryInputs>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      img: new File([], ""),
    },
    mode: "onChange",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  console.log(form.formState.errors);
  // 2. Define a submit handler.
  async function onSubmit(values: CreateCategoryInputs) {
    try {
      const res = await createCategory({ ...values });
      if (res.success) {
        toast.success(res.message);
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
          placeholder="enter category name"
          control={form.control}
          name="name"
          className="rounded-sm!"
        />

        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
