import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProductCategory } from "@prisma/client";
import UpdateCategoryForm from "../update-category-form";

export default function UpdateCategoryModal({
  category,
}: {
  category: ProductCategory;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-sm text-white capitalize"
          size={"sm"}
        >
          edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:p-2 max-sm:py-6">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <UpdateCategoryForm category={category} />
        <DialogDescription className="sr-only">
          Update your product details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
