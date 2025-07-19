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
import { deleteCategoryAction } from "@/lib/server/actions/category/delete-category-action";
import { useRef, useTransition } from "react";

import { toast } from "react-toastify";

export default function DeleteCategoryModal({
  categoryId,
}: {
  categoryId: string;
}) {
  const actionBtnRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  function handleDeleteCategoryClick() {
    startTransition(async () => {
      try {
        const response = await deleteCategoryAction(categoryId);
        if (!response.success) return void toast.error(response.error.message);
        toast.success(response.data.message);
        actionBtnRef.current?.click();
      } catch (e) {
        console.error({ e });
        toast.error("Network Error");
      }
    });
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
            Category and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="hidden" ref={actionBtnRef} />
          <Button
            onClick={() => handleDeleteCategoryClick()}
            disabled={isPending}
            type="submit"
            className="rounded-sm bg-destructive hover:bg-destructive/80 font-semibold h-auto"
            size={"sm"}
          >
            {isPending ? "Confirming.." : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/*
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
import { deleteCategoryAction } from "@/lib/server/actions/category/delete-category-action";
import { useActionState, useEffect } from "react";

import { toast } from "react-toastify";

export default function DeleteCategoryModal({
  categoryId,
}: {
  categoryId: string;
}) {
  // TODO: Make it by using useActionState
  const [state, formAction, isPending] = useActionState(
    deleteCategoryAction,
    undefined,
    categoryId
  );

  // useEffect(() => {
  //   if (!state) return;
  //   if (state.success) return void toast.success(state.data.message);

  //   if (state.error) toast.error(state.error.message);
  //   // FIXME: error toast not workng
  // }, [state]);

  useEffect(() => {
    if (state && !state.success && state.error)
      toast.error(state.error.message);
    return () => {
      console.log("unmount", { state: state });
      if (state && state.success) toast.success(state.data.message);
    };
  }, [state]);
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
            Category and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm text-white">
            Cancel
          </AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="categoryId" value={categoryId} />

            <AlertDialogAction asChild>
              <Button
                disabled={isPending}
                type="submit"
                className="rounded-sm bg-destructive hover:bg-destructive/80 font-semibold"
                size={"sm"}
              >
                {isPending ? "Confirming.." : "Confirm"}
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}



*/
