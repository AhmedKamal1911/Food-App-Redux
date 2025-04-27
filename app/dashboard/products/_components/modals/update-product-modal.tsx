import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateProductForm from "../update-product-form";
import { ProductWithRelations } from "@/lib/types/product";

export default function UpdateProductModal({
  product,
}: {
  product: ProductWithRelations;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm text-white" size={"sm"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:p-2 max-sm:py-6">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <UpdateProductForm product={product} />
        <DialogDescription className="sr-only">
          Update your product details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
