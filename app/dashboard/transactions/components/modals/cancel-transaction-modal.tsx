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

import { AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function CancelTransactionModal() {
  async function onConfirmCancelTransaction() {
    try {
      // const res = await deleteUserAction({ userId });
      // if (!res.success) {
      //   toast.error(res.error.message);
      // } else {
      //   toast.success(res.data.message);
      // }
    } catch (error) {
      toast.error("An Network Error Occured");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded-sm" size={"sm"}>
          <AlertCircle />
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently Cancel the
            transaction and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-sm text-white">
            Back
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmCancelTransaction} asChild>
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
