"use client";

import { ProductWithRelations } from "@/lib/types/product";
import { columns } from "./productsTable/columns";

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
import CustomTableSearchInput from "../../../../components/common/custom-table-search-input";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationControls from "@/components/common/pagination-controls";

type Props = {
  page: number;
  lastPage: number;
  data: ProductWithRelations[];
  categories: ProductCategory[];
};
export default function ProductsTableSection({
  data,
  categories,
  page,
  lastPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };
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
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="bg-white p-4 rounded-lg shadow">
      <CategoriesProvider categories={categories}>
        <div className="flex max-lg:flex-col gap-2 items-center justify-between mb-4">
          <span className="text-2xl font-semibold">Products</span>
          <div className="flex max-sm:flex-col max-sm:items-stretch max-sm:w-full gap-2 items-center">
            <CustomTableSearchInput
              columnName="name"
              placeholder="Search A Product .."
              table={table}
            />
            <ProductsCategoryFilter categories={categories} />
            <CreateProductModal />
          </div>
        </div>
        <ProductsTable columns={columns} table={table} />
        <PaginationControls
          page={page}
          lastPage={lastPage}
          goToPage={goToPage}
        />
      </CategoriesProvider>
    </section>
  );
}
