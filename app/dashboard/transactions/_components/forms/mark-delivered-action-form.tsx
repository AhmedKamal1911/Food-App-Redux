"use client";

import { Button } from "@/components/ui/button";
import { markTransactionDeliveredAction } from "@/lib/server/actions/order/mark-transaction-delivered-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
type Props = {
  orderId: string;
};
export default function MarkDeliveredActionForm({ orderId }: Props) {
  const [state, formAction, isPending] = useActionState(
    markTransactionDeliveredAction,
    undefined
  );
  useEffect(() => {
    if (state?.status === "success") return void toast.success(state.message);
    if (state?.error) toast.error(state.error.message);
  }, [state]);
  return (
    <form action={formAction}>
      <input type="hidden" name="orderId" value={orderId} />
      <Button
        disabled={isPending}
        className="bg-green-500 hover:bg-green-600 capitalize font-semibold"
      >
        {isPending ? "Processing..." : "mark as delivered"}
      </Button>
    </form>
  );
}
