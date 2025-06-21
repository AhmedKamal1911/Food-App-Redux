import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCategoryForm from "../forms/create-category-form";

export default function CreateCategoryModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black rounded-sm text-white  hover:bg-gray-800">
          + Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:p-2 max-sm:py-6">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <CreateCategoryForm />
        <DialogDescription className="sr-only">
          Fill your Category details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
