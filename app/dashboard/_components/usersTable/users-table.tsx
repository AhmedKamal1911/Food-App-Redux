"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PackageOpen } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
export default function UsersTable({ data }: { data: User[] }) {
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
    <div className="rounded-md border shadow-md">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      {/* Pagination Controls */}
      {/* <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-2 sm:gap-4 px-4 py-4">
    <span className="text-sm text-gray-500">
      Page {page} of {lastPage}
    </span>
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(page + 1)}
        disabled={page >= lastPage}
      >
        Next
      </Button>
    </div>
  </div> */}
    </div>
  );
}
