import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ProductCategory } from "@prisma/client";

import { CreditCard, Home, LibraryBig } from "lucide-react";

import { usePathname } from "next/navigation";

import ProductsMenuItemWithFilteration from "./products-menu-item-with-filteration";
import Link from "next/link";

const items = [
  {
    title: "home",
    url: "/dashboard",
    icon: Home,
  },

  {
    title: "categories",
    url: "/dashboard/categories",
    icon: LibraryBig,
  },
  {
    title: "transactions History",
    url: "/dashboard/transactions",
    icon: CreditCard,
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
                  className={`text-xl capitalize rounded-sm py-5 ${
                    isActive && "bg-primary/90! text-white!"
                  }`}
                  asChild
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
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
