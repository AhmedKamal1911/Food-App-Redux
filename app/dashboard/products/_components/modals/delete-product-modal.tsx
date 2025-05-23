import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/server/actions/product/delete-product";
import { toast } from "react-toastify";

export default function DeleteProductModal({
  productId,
}: {
  productId: string;
}) {
  async function onConfirmDeleteProduct() {
    try {
      const res = await deleteProduct({ productId });
      if (!res.success) {
        toast.error(res.error.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("An Network Error Occured");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded-sm" size={"sm"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDeleteProduct} asChild>
            <Button
              className="rounded-sm bg-destructive hover:bg-destructive/80 font-semibold"
              size={"sm"}
            >
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
