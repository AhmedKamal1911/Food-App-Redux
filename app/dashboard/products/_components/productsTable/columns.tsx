"use client";
import { Button } from "@/components/ui/button";
import { ProductWithRelations } from "@/lib/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<ProductWithRelations>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imgSrc = row.original.image;
      return (
        <div className="bg-gray-200/60 p-2 rounded-sm size-15 flex items-center justify-center shadow-md">
          <Image
            src={imgSrc}
            alt="Product"
            width={100}
            height={100}
            className="object-cover rounded-sm"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <span className="text-secondary">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "price",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize text-[16px] rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          price
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.price || 0;
      return <span>${price.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "sell",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize text-[16px] rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sell
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: () => {
      const sell = Math.floor(Math.random() * 100 + 50);
      return <span>{sell}</span>;
    },
  },
  {
    header: "View",
    cell: () => {
      const view = Math.floor(Math.random() * 6000 + 8000);
      return <span>{view.toLocaleString()}</span>;
    },
  },
  {
    header: "Earning",
    cell: ({ row }) => {
      const price = row.original.price || 0;
      const sell = Math.floor(Math.random() * 100 + 50);
      const earning = price * sell;
      return <span>${earning.toLocaleString()}</span>;
    },
  },
];
