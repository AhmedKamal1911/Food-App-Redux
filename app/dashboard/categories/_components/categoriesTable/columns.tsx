"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

import { ProductCategory } from "@prisma/client";
import DeleteCategoryModal from "../modals/delete-category-modal";
import UpdateCategoryModal from "../modals/update-category-modal";

export const columns: ColumnDef<ProductCategory>[] = [
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
          category name
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
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-2">
          <UpdateCategoryModal category={row.original} />
          <DeleteCategoryModal categoryId={row.original.id} />
        </div>
      );
    },
  },
];
