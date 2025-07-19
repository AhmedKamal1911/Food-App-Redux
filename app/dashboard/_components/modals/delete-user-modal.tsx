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
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
type Props = {
  userId: string;
};
export default function DeleteUserModal({ userId }: Props) {
  const [isPending, startTransition] = useTransition();
  const actionBtnRef = useRef<HTMLButtonElement>(null);
  function handleDeleteUserClick() {
    startTransition(async () => {
      try {
        const response = await deleteUserAction(userId);
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
          <AlertDialogAction className="hidden" ref={actionBtnRef} />
          <Button
            onClick={() => handleDeleteUserClick()}
            disabled={isPending}
            className="rounded-sm bg-destructive hover:bg-destructive/80 font-semibold h-auto"
            size={"sm"}
            type="submit"
          >
            {isPending ? "Confirming..." : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
