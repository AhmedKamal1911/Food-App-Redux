"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductCategory } from "@prisma/client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PackageOpen } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import PaginationControls from "@/components/common/pagination-controls";
import CustomTableSearchInput from "@/components/common/custom-table-search-input";

export default function CategoriesTable({ data }: { data: ProductCategory[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination: {
        pageSize: 6,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const page = table.getState().pagination.pageIndex;
  const lastPage = table.getPageCount();
  const goToPage = (newPage: number) => {
    if (newPage < 0 || newPage >= lastPage) return;
    table.setPageIndex(newPage);
  };
  return (
    <>
      <div className="flex justify-end">
        <CustomTableSearchInput
          columnName="name"
          placeholder="search a Category..."
          table={table}
        />
      </div>

      <div className="rounded-md border shadow-md mt-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-bold capitalize text-[14px] md:text-[16px] whitespace-nowrap text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-primary/10 font-semibold text-gray-700"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-[13px] md:text-[15px] whitespace-nowrap text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="py-10 h-24 font-bold text-center uppercase"
                >
                  <div className="flex flex-col items-center gap-4 text-base md:text-xl">
                    No results.
                    <PackageOpen className="size-12 md:size-15" />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        page={page + 1}
        lastPage={lastPage}
        goToPage={(userPage) => goToPage(userPage - 1)}
      />
    </>
  );
}
