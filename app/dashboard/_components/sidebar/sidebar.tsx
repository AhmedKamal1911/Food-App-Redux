"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut, Pizza } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import NavLinksGroup from "./nav-links-group";
import HelpGroup from "./help-group";
import { ProductCategory } from "@prisma/client";
import { useLogOut } from "@/hooks/use-log-out";
import { toast } from "react-toastify";

// Menu items.

type Props = {
  categories: ProductCategory[];
};
export default function SideBar({ categories }: Props) {
  const { state } = useSidebar();
  const { loading, onLogout } = useLogOut();
  async function onLogoutBtnClick() {
    await onLogout();
    toast.success("You Logged Out Successfully.");
  }

  return (
    <div className="relative ">
      <Sidebar variant="sidebar" collapsible="icon">
        <div className="bg-[#161718] flex flex-col flex-1 text-gray-300 z-[999]">
          <SidebarHeader>
            <Link href={"/dashboard"}>
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
            <SidebarMenuButton
              disabled={loading}
              onClick={onLogoutBtnClick}
              className="cursor-pointer font-semibold hover:text-destructive transition-colors"
            >
              <LogOut /> {loading ? "Loading" : "Logout"}
            </SidebarMenuButton>
          </SidebarFooter>
        </div>
      </Sidebar>
      <SidebarTrigger className=" hover:bg-white hover:text-black rounded-full  text-primary absolute top-5 left-[calc(100%-10px)] z-50 size-8 bg-secondary" />
    </div>
  );
}
