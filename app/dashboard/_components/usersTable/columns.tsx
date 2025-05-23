"use client";
import { Button } from "@/components/ui/button";

import { Column, ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  AtSign,
  Calendar,
  CirclePower,
  CircleUser,
} from "lucide-react";
import Image from "next/image";

import { User, UserRole } from "@prisma/client";

import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ROLES_LIST } from "@/lib/data";
import DeleteUserModal from "../modals/delete-user-modal";
import UpdateUserModal from "../modals/update-user-modal";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    enablePinning: false,
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          full name
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "email",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <AtSign className=" size-4" />
          <span>email</span>
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
    header: ({ column }) => (
      <div>
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <CircleUser className=" size-4" />
          <span>image</span>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const imgSrc = row.original.image;
      return (
        <div className="bg-gray-200/60 p-1 rounded-sm size-15 inline-flex  shadow-md">
          <Image
            src={imgSrc ?? "/svgs/user.svg"}
            alt="Product"
            width={50}
            height={50}
            className="object-cover rounded-sm"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    filterFn: "arrIncludesSome",
    header: ({ column }) => {
      return <RoleHeader column={column} />;
    },
    cell: ({ row }) => (
      <span className="text-secondary capitalize">{row.original.role}</span>
    ),
  },
  {
    accessorKey: "createdAt",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Calendar className="size-4" />
          <span>joined date</span>
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary capitalize">
        {format(row.original.createdAt.toDateString(), "dd MMMM yyyy, HH:mm")}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold capitalize  rounded-none p-1! focus-visible:ring-primary/50"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Calendar className="size-4" />
          <span>updated date</span>
          <ArrowUpDown className=" size-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="text-secondary capitalize">
        {format(row.original.createdAt.toDateString(), "dd MMMM yyyy, HH:mm")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => {
      return (
        <div className="inline-flex items-center gap-2">
          <CirclePower className=" size-4" />
          actions
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <UpdateUserModal user={row.original} />
          <DeleteUserModal userId={row.original.id} />
        </div>
      );
    },
  },
];

function RoleHeader({ column }: { column: Column<User> }) {
  const selectedRoles = column.getFilterValue() as UserRole[] | undefined;

  console.log({ selectedRoles });
  function toggleRoleChecked(userRole: UserRole) {
    if (selectedRoles?.includes(userRole)) {
      const newRoles = selectedRoles.filter((role) => role !== userRole);
      column.setFilterValue(newRoles);
    } else {
      column.setFilterValue([...(selectedRoles ?? []), userRole]);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-none font-semibold focus-visible:ring-primary/50"
        >
          Role
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLES_LIST.map((role, i) => (
          <DropdownMenuCheckboxItem
            className="capitalize"
            key={i}
            checked={selectedRoles?.includes(role) ?? false}
            onCheckedChange={() => toggleRoleChecked(role)}
          >
            {role}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
