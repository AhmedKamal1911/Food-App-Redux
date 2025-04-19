"use client";

import {
  ColumnDef,
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductsTableProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  page: number;
  lastPage: number;
}

export function ProductsTable<TData, TValue>({
  table,
  columns,
  lastPage,
  page,
}: ProductsTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log({ page, lastPage });

  const goToPage = (newPage: number) => {
    // Rebuild all existing params, then override `page`
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="font-bold capitalize text-[16px] "
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:bg-primary/10 font-semibold text-gray-700"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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
                <div className="flex flex-col items-center gap-4 text-xl">
                  No results.
                  <PackageOpen className="size-15" />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className=" flex items-center justify-end mr-2 space-x-2 py-4 text-white">
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
    </div>
  );
}
