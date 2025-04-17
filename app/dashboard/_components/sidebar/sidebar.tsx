"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import NavLinksGroup from "./nav-links-group";
import HelpGroup from "./help-group";
import { ProductCategory } from "@prisma/client";

// Menu items.

type Props = {
  categories: ProductCategory[];
};
export default function SideBar({ categories }: Props) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className=" bg-black">
      <div className="bg-[#161718] flex flex-col flex-1 text-gray-300">
        <SidebarHeader>
          <Link href={"/dashboard"}>
            <div className="flex justify-center border sm:p-1 rounded-sm">
              <Image
                priority
                src={"/images/logo.png"}
                alt="logo"
                height={53}
                width={184}
                className="object-cover"
              />
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <NavLinksGroup categories={categories} />
          <HelpGroup />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton className="cursor-pointer font-semibold hover:text-destructive transition-colors">
            <LogOut /> Logout
          </SidebarMenuButton>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
