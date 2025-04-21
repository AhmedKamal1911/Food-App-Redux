"use client";

import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DropZoneField from "../../_components/drop-zone-field";
import ProductImgViewer from "../../_components/product-img-viewer";
import { ProductWithRelations } from "@/lib/types/product";
import { useEffect, useState } from "react";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  img: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "Only JPG or PNG files are allowed",
      }
    )
    .optional(),
});

export default function UpdateProductForm({
  product,
}: {
  product: ProductWithRelations;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      img: undefined,
    },
    mode: "onChange",
  });
  const [showProductImg, setShowProductImg] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");
  console.log({ previewUrl });
  const updatedImg = form.watch("img");
  console.log({ updatedImg });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (values.img) {
      // Handle the file upload here
      console.log("File to upload:", values.img);
    }
  }

  useEffect(() => {
    if (!updatedImg || updatedImg.size === 0) {
      setShowProductImg(true);
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(updatedImg);
    setPreviewUrl(url);
    setShowProductImg(false);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [updatedImg]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Preview uploaded image */}
        {previewUrl && (
          <ProductImgViewer
            onProductImgHide={() => {
              setPreviewUrl("");
              form.setValue("img", new File([], "")); // Reset the file input
            }}
            src={previewUrl}
            alt={`${product.name} product (preview)`}
          />
        )}

        {/* Show original product image if no preview */}
        {!previewUrl && showProductImg && (
          <ProductImgViewer
            onProductImgHide={() => {
              setShowProductImg(false);
            }}
            src={product.image}
            alt={`${product.name} product`}
          />
        )}

        {/* Show DropZone if there's no preview */}
        {!previewUrl && (
          <DropZoneField
            control={form.control}
            name="img"
            placeholder="Drop your new image"
            className="hover:bg-primary/10 transition-colors"
          />
        )}

        <CustomInputField
          placeholder="Username"
          control={form.control}
          name="username"
          className="rounded-sm!"
        />

        <Button>Submit</Button>
      </form>
    </Form>
  );
}
