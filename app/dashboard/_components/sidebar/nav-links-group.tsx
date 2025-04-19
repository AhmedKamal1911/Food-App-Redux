import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ProductCategory } from "@prisma/client";

import { Calendar, Home } from "lucide-react";

import { usePathname } from "next/navigation";

import ProductsMenuItemWithFilteration from "./products-menu-item-with-filteration";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },

  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
];
type Props = {
  categories: ProductCategory[];
};
export default function NavLinksGroup({ categories }: Props) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  className={`text-xl  rounded-sm py-5 ${
                    isActive && "bg-primary/90! text-white!"
                  }`}
                  asChild
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <ProductsMenuItemWithFilteration categories={categories} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
