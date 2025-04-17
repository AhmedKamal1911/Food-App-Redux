import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "./_components/sidebar/sidebar";
import { getAllCategories } from "@/lib/server/queries";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getAllCategories();
  return (
    <div>
      <SidebarProvider>
        <div className="min-h-screen flex">
          <SideBar categories={categories} />

          <main className="w-full flex-1 p-1 bg-gray-100">
            <SidebarTrigger className="rounded-none bg-blue-300" />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
