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
import CategoriesProvider from "@/providers/categories-provider";
import { ProductCategory } from "@prisma/client";
import CreateProductModal from "./modals/create-product-modal";
import ProductsCategoryFilter from "./products-category-filter";

type Props = {
  currentPage: number;
  totalPages: number;
  data: ProductWithRelations[];
  categories: ProductCategory[];
};
export default function ProductsTableSection({
  data,
  categories,
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
      <CategoriesProvider categories={categories}>
        <div className="flex max-lg:flex-col gap-2 items-center justify-between mb-4">
          <span className="text-2xl font-semibold">Products</span>
          <div className="flex max-sm:flex-col max-sm:items-stretch max-sm:w-full gap-2 items-center">
            <ProductsFilterInput table={table} />
            <ProductsCategoryFilter categories={categories} />
            <CreateProductModal />
          </div>
        </div>
        <ProductsTable
          columns={columns}
          table={table}
          page={currentPage}
          lastPage={totalPages}
        />
      </CategoriesProvider>
    </section>
  );
}
