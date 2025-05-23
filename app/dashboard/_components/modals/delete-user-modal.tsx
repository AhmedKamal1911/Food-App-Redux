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
import { toast } from "react-toastify";

export default function DeleteUserModal({ userId }: { userId: string }) {
  async function onConfirmDeleteUser() {
    try {
      const res = await deleteUserAction({ userId });
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
          <AlertDialogAction onClick={onConfirmDeleteUser} asChild>
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
