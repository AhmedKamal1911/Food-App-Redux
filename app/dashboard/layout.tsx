import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "./_components/sidebar/sidebar";
import { getAllCategories } from "@/lib/server/queries";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getAllCategories();
  // FIXME: right side of the layout
  return (
    <SidebarProvider>
      <SideBar categories={categories} />

      <div className="flex-1 min-w-0">{children}</div>
    </SidebarProvider>
  );
}
