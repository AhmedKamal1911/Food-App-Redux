import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateProductForm from "../create-product-form";

export default function CreateProductModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black rounded-sm text-white  hover:bg-gray-800">
          + Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <CreateProductForm />
        <DialogDescription className="sr-only">
          Fill your product details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
