"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown, Calendar1, ChevronDown, Coins } from "lucide-react";

export const columns: ColumnDef<{
  id: string;
  name: string;
  createdAt: string;
  status: string;
  amount: number;
}>[] = [
  {
    accessorKey: "id",
    enablePinning: false,
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          invoice id
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary">#{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    enablePinning: false,
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          name
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "date",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Calendar1 className=" size-4" />
          <span>date</span>
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary">{row.original.createdAt}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div>
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Coins className=" size-4" />
          <span>amount</span>
          <ArrowUpDown className=" size-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-secondary">${row.original.amount}</span>
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
              {["paid", "unpaid"].map((status) => (
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
            "bg-green-100 text-green-800": row.original.status === "paid",
            "bg-red-100 text-red-800": row.original.status === "unpaid",
          },
          "text-secondary capitalize"
        )}
      >
        {row.original.status}
      </Badge>
    ),

    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },

  // {
  //   id: "actions",
  //   header: () => {
  //     return (
  //       <div className="inline-flex items-center gap-2">
  //         <CirclePower className=" size-4" />
  //         actions
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center justify-center gap-2">
  //         <UpdateUserModal user={row.original} />
  //         <DeleteUserModal userId={row.original.id} />
  //       </div>
  //     );
  //   },
  // },
];
