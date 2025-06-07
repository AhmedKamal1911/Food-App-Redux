"use client";
import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";

import { useLogOut } from "@/hooks/use-log-out";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session;
};
export default function UserProfile({ session }: Props) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            className="rounded-full cursor-pointer border-2 border-gray-300 hover:border-primary transition"
            height={40}
            width={40}
            src={session.user.image ?? "/svgs/user.svg"}
            alt="User Avatar"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-50  rounded-sm shadow-xl border z-[999]">
          <div>
            <DropdownMenuLabel className="text-lg text-center font-semibold p-0">
              My Account
            </DropdownMenuLabel>
            <div className=" ">
              <p className="font-medium text-gray-800 dark:text-gray-100">
                <span className="capitalize font-semibold">name : </span>
                {session.user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="capitalize font-semibold">email : </span>
                {session.user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href={"/account?tab=personal-info"}>
              <DropdownMenuItem className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <User className="w-4 h-4 text-primary" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>

            <Link href={"/account?tab=general"}>
              <DropdownMenuItem className="gap-2  hover:bg-gray-100 dark:hover:bg-gray-800">
                <Settings className="w-4 h-4 text-primary" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="gap-2   hover:bg-gray-100  transition-colors"
          >
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SignOutBtn() {
  const { loading, onLogout } = useLogOut();
  return (
    <Button
      disabled={loading}
      onClick={onLogout}
      variant={"ghost"}
      className="flex p-1.5! justify-start w-full hover:text-destructive"
    >
      <LogOut className="size-4" />
      <span>{loading ? "Loading..." : "Logout"} </span>
    </Button>
  );
}
