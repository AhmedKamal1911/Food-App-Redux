import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionOrder } from "@/lib/types/product";
import { format } from "date-fns";

import { View } from "lucide-react";
import Image from "next/image";
import MarkDeliveredActionForm from "../forms/mark-delivered-action-form";
import { useSession } from "next-auth/react";

export default function ViewTransactionDetailsModal({
  transaction,
}: {
  transaction: TransactionOrder;
}) {
  const session = useSession();
  const isUser = session.data && session.data.user.role === "user";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm text-white" size={"sm"}>
          <View />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:p-2 max-sm:py-3">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground">
            Transaction ID: #{transaction.id}
          </span>
          <span className="font-semibold">Total: ${transaction.total}</span>
          <span className="font-semibold">Status: {transaction.status}</span>
          <span className="font-semibold">
            Date: {format(transaction.createdAt, "MMMM dd, yyyy, HH:mm  a")}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground font-semibold">
                Products:
              </span>
              <ScrollArea className="max-h-60">
                <div className="flex flex-col gap-1">
                  {transaction.items.map((item) => (
                    <TransactionItem item={item} key={item.id} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {transaction.status === "pending" && !isUser && (
          <MarkDeliveredActionForm orderId={transaction.id} />
        )}

        <DialogDescription className="sr-only">
          show transaction details here
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function TransactionItem({
  item,
}: {
  item: TransactionOrder["items"][number];
}) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-start  gap-1 p-2 border rounded-md"
    >
      <div className="flex items-center gap-2">
        <div>
          <Image
            src={item.product.image ?? "/images/decorations/placeholder.png"}
            alt={item.product.name ?? "product image placeholder"}
            width={40}
            height={40}
            className="rounded object-cover"
          />
        </div>
        <span className="font-bold text-xl">{item.product.name}</span>
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
        <span className="text-[16px]">Qty: x{item.qty}</span>
        <span className="text-[16px]">Price: ${item.product.price}</span>
      </div>
      {item.selectedExtras.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="font-semibold capitalize">extras :</span>
          <div className="flex flex-col gap-1">
            {item.selectedExtras.map((ex) => (
              <span
                key={ex.id}
                className="text-xs  text-rose-500"
              >{`${ex.name} ($${ex.price})`}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
