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
import { deleteUserAction } from "@/lib/server/actions/user/delete-user-action";

import { Trash } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DeleteUserModal({ userId }: { userId: string }) {
  const [state, formAction, isPending] = useActionState(
    deleteUserAction,
    undefined,
    userId
  );

  useEffect(() => {
    if (state?.success) return void toast.success(state.data.message);

    if (state?.error) toast.error(state.error.message);
    // FIXME: error toast not workng
  }, [state]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded-sm" size={"sm"}>
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your user
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm text-white">
            Cancel
          </AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="userId" value={userId} />

            <AlertDialogAction asChild>
              <Button
                disabled={isPending}
                className="rounded-sm bg-destructive hover:bg-destructive/80 font-semibold"
                size={"sm"}
                type="submit"
              >
                {isPending ? "Confirming..." : "Confirm"}
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
