"use client";
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
import { cancelTransactionAction } from "@/lib/server/actions/order/cancel-transaction-action";
import { AlertCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CancelTransactionModal({
  orderId,
}: {
  orderId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    cancelTransactionAction,
    undefined,
    orderId
  );
  useEffect(() => {
    if (state?.success) return void toast.success(state.data.message);

    if (state?.error) toast.error(state.error.message);
  }, [state]);
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
          <form action={formAction}>
            <input type="hidden" name="orderId" value={orderId} />
            <AlertDialogAction asChild>
              <Button
                className="rounded-sm bg-destructive hover:bg-destructive/80 font-semibold"
                size={"sm"}
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Cancelling..." : "Confirm"}
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
