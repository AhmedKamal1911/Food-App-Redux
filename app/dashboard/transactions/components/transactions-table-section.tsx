"use client";

import CustomTableSearchInput from "@/components/common/custom-table-search-input";
import PaginationControls from "@/components/common/pagination-controls";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./transactionsTable/columns";
import TransactionsTable from "./transactionsTable/transactions-table";
type Props = {
  data: {
    id: string;
    name: string;
    createdAt: string;
    status: string;
    amount: number;
  }[];
};
export default function TransactionTableSection({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 6,
      },
    },
    state: {
      sorting,
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
    <div>
      <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-3">
        <span className="text-2xl capitalize font-semibold">
          Transactions :
        </span>
        <CustomTableSearchInput
          columnName="name"
          placeholder="search a Transaction..."
          table={table}
        />
      </div>
      <div className="mt-4">
        <TransactionsTable columns={columns} table={table} />
        <PaginationControls
          page={page + 1}
          lastPage={lastPage}
          goToPage={(userPage) => goToPage(userPage - 1)}
        />
      </div>
    </div>
  );
}
