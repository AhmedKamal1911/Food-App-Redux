"use client";

import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";

import { toast } from "react-toastify";
import {
  CreateCategoryInputs,
  createCategorySchema,
} from "@/lib/validation/create-category-schema";
import { createCategoryAction } from "@/lib/server/actions/category/create-category-action";
import DropZoneViewer from "@/app/dashboard/_components/drop-zone-viewer";

export default function CreateCategoryForm({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<CreateCategoryInputs>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      img: new File([], ""),
    },
    mode: "onChange",
  });

  const [previewUrl, setPreviewUrl] = useState("");

  // 2. Define a submit handler.
  async function onSubmit(values: CreateCategoryInputs) {
    try {
      const res = await createCategoryAction({ ...values });
      if (res.success) {
        toast.success(res.message);
        setOpenModal(false);
      }
      if (!res.success && res.error.type === "error") {
        toast.error(res.error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
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
