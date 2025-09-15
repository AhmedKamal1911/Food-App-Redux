"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut, Pizza, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import NavLinksGroup from "./nav-links-group";
import HelpGroup from "./help-group";
import { ProductCategory } from "@prisma/client";
import { useLogout } from "@/hooks/use-log-out";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

// Menu items.

type Props = {
  categories: ProductCategory[];
};
export default function SideBar({ categories }: Props) {
  const { state } = useSidebar();

  return (
    <div className="relative ">
      <Sidebar variant="sidebar" collapsible="icon">
        <div className="bg-[#161718] flex flex-col flex-1 text-gray-300 z-[999]">
          <SidebarHeader>
            <Link href={"/"}>
              <div className="flex justify-center border-b-1 border-gray-200 p-2 ">
                {state === "collapsed" ? (
                  <Pizza />
                ) : (
                  <Image
                    priority
                    src={"/images/logo.png"}
                    alt="logo"
                    height={53}
                    width={184}
                    className="object-cover"
                  />
                )}
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <NavLinksGroup categories={categories} />
            <HelpGroup />
          </SidebarContent>
          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </div>
      </Sidebar>
      <SidebarTrigger className=" hover:bg-white hover:text-black rounded-full  text-primary absolute top-5 left-[calc(100%-10px)] z-50 size-8 bg-secondary" />
    </div>
  );
}

function NavUser() {
  const { isMobile, state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`data-[state=open]:bg-primary rounded-sm ${state === "collapsed" && "hover:bg-transparent  ring-1 ring-gray/80"}  data-[state=open]:text-white cursor-pointer `}
            >
              <AvatarBox />

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm shadow-md "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={3}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <AvatarBox />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href={"/account?tab=personal-info"}>
                <DropdownMenuItem className="cursor-pointer">
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href={"/account?tab=general"}>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function AvatarBox() {
  const { data, status } = useSession();
  const user = data?.user;

  if (status === "loading") {
    // Skeleton loader while fetching user
    return (
      <div className="flex items-center gap-2 text-left text-sm animate-pulse">
        <Avatar className="size-8 rounded-sm bg-gray-300" />
        <div className="grid flex-1 text-left text-sm leading-tight font-semibold">
          <span className="h-4 w-20 bg-gray-300 rounded mb-1" />
          <span className="h-3 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2  text-left text-sm">
      <Avatar className="size-8 rounded-sm">
        <AvatarImage
          src={user?.image ?? "/svgs/user.svg"}
          alt={user?.name ?? "user image"}
          fetchPriority="high"
          className="object-cover"
        />
        <AvatarFallback className="rounded-sm text-white">
          {user?.name?.[0] ?? <User className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight font-semibold">
        <span className="truncate">{user?.name}</span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
    </div>
  );
}

function LogoutBtn() {
  const { isLoading, onLogout } = useLogout("/login");

  return (
    <SidebarMenuButton
      disabled={isLoading}
      onClick={onLogout}
      className="cursor-pointer font-semibold hover:text-destructive transition-colors"
    >
      <LogOut /> {isLoading ? "Loading" : "Logout"}
    </SidebarMenuButton>
  );
}
