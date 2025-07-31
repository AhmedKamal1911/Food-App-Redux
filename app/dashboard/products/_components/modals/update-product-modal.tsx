import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProductWithRelations } from "@/lib/types/product";
import UpdateProductForm from "../forms/update-product-form";
import { useState } from "react";

export default function UpdateProductModal({
  product,
}: {
  product: ProductWithRelations;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm text-white" size={"sm"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:p-2 max-sm:py-6">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <UpdateProductForm setOpenModal={setOpen} product={product} />
        <DialogDescription className="sr-only">
          Update your product details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
