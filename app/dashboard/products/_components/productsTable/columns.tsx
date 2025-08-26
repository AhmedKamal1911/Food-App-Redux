"use client";
import { Button } from "@/components/ui/button";
import { ProductWithRelations } from "@/lib/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import DeleteProductModal from "../modals/delete-product-modal";
import UpdateProductModal from "../modals/update-product-modal";

import ExtrasPopover from "../extras-popover";
import SizesPopover from "../sizes-popover";
import { format } from "date-fns";

export const columns: ColumnDef<ProductWithRelations>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    enablePinning: false,
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1!"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          product name
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imgSrc = row.original.image;
      return (
        <div className="bg-gray-200/60 p-2 rounded-sm size-15 inline-flex  shadow-md">
          <Image
            src={imgSrc ?? "/images/decorations/placeholder.png"}
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
    accessorKey: "category",
    header: "category",
    cell: ({ row }) =>
      row.original.category ? (
        <div className="flex items-center gap-2">
          <div className="rounded-sm overflow-hidden relative size-[50px]">
            <Image
              className="aspect-square"
              src={row.original.category?.image ?? ""}
              fill
              alt="cat img"
            />
          </div>
          <span className="text-secondary">{row.original.category?.name}</span>
        </div>
      ) : (
        <span>No Category</span>
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
    accessorKey: "sizes",
    header: "sizes",
    cell: ({ row }) => {
      const sizes = row.original.sizes;
      return <SizesPopover sizes={sizes} />;
    },
  },
  {
    accessorKey: "extras",
    header: "extras",
    cell: ({ row }) => {
      const extras = row.original.extras;
      return <ExtrasPopover extras={extras} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize text-[16px] rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>{format(new Date(row.original.createdAt), "MMMM dd, yyyy")}</span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize text-[16px] rounded-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          updated at
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>{format(new Date(row.original.updatedAt), "MMMM dd, yyyy")}</span>
      );
    },
  },
  {
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <UpdateProductModal product={row.original} />
          <DeleteProductModal productId={row.original.id} />
        </div>
      );
    },
  },
];
