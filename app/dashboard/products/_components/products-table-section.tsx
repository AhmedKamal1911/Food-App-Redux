"use client";

import { ProductWithRelations } from "@/lib/types/product";
import { columns } from "./productsTable/columns";
import ProductsFilterInput from "./productsTable/products-filter-input";
import { ProductsTable } from "./productsTable/products-table";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  data: ProductWithRelations[];
};
export default function ProductsTableSection({
  data,
  currentPage,
  totalPages,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-semibold">Products</span>
        <div className="flex gap-5 items-center">
          <ProductsFilterInput table={table} />
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            + Add Product
          </button>
        </div>
      </div>
      <ProductsTable
        columns={columns}
        table={table}
        page={currentPage}
        lastPage={totalPages}
      />
    </section>
  );
}
