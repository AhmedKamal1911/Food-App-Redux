"use client";
import { User } from "@prisma/client";
import UsersTable from "./usersTable/users-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./usersTable/columns";
import { useState } from "react";

import CustomTableSearchInput from "../../../components/common/custom-table-search-input";
import PaginationControls from "@/components/common/pagination-controls";

type Props = {
  data: User[];
};
export default function UsersTableSection({ data }: Props) {
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
      <div className="flex items-center justify-between">
        <span className="text-2xl capitalize font-semibold">users :</span>
        <CustomTableSearchInput
          columnName="name"
          placeholder="search a user..."
          table={table}
        />
      </div>

      <div className="mt-4">
        <UsersTable columns={columns} table={table} />
        <PaginationControls
          page={page + 1}
          lastPage={lastPage}
          goToPage={(userPage) => goToPage(userPage - 1)}
        />
      </div>
    </div>
  );
}
