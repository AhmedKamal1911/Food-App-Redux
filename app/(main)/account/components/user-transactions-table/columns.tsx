"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TransactionStatus } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Calendar1,
  ChevronDown,
  CirclePower,
  Coins,
} from "lucide-react";

import ViewTransactionDetailsModal from "@/app/dashboard/transactions/components/modals/view-transaction-details-modal";
import { TransactionOrder } from "@/lib/types/product";

export const columns: ColumnDef<TransactionOrder>[] = [
  {
    accessorKey: "id",
    enablePinning: false,
    header: () => {
      return <span>invoice_id</span>;
    },

    cell: ({ row }) => (
      <span className="text-secondary">#{row.original.id}</span>
    ),
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Calendar1 className=" size-4" />
          <span>createdAt</span>
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ getValue }) => (
      <span className="text-secondary">
        {format(getValue<Date>(), "MMMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <div>
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Coins className=" size-4" />
          <span>total</span>
          <ArrowUpDown className=" size-4" />
        </Button>
      </div>
    ),
    cell: ({ getValue }) => (
      <span className="text-secondary">${getValue<number>()}</span>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      const filterValue = (column.getFilterValue() as string[]) || [];

      const toggleValue = (value: string) => {
        column.setFilterValue(
          filterValue.includes(value)
            ? filterValue.filter((v) => v !== value)
            : [...filterValue, value]
        );
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex justify-center items-center gap-1 p-1 cursor-pointer hover:bg-gray-100"
              asChild
            >
              <div>
                Status
                <ChevronDown className="size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.values(TransactionStatus).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  className="capitalize"
                  checked={filterValue.includes(status)}
                  onCheckedChange={() => toggleValue(status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },

    cell: ({ row }) => (
      <Badge
        className={clsx(
          {
            "bg-green-200 text-green-800": row.original.status === "delivered",
            "bg-red-200 text-red-800": row.original.status === "canceled",
            "bg-yellow-200 text-yellow-800": row.original.status === "pending",
          },
          "capitalize font-semibold"
        )}
      >
        {row.original.status}
      </Badge>
    ),

    filterFn: "arrIncludesSome",
  },

  {
    id: "actions",
    header: () => {
      return (
        <div className="inline-flex items-center gap-2">
          <CirclePower className=" size-4" />
          actions
        </div>
      );
    },
    cell: ({ row }) => {
      return <ViewTransactionDetailsModal transaction={row.original} />;
    },
  },
];
