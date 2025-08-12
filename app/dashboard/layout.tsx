import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "./_components/sidebar/sidebar";
import { getAllCategories } from "@/lib/server/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Pizzon Food Delivery",
    template: "%s | Dashboard | Pizzon Food Delivery",
  },
  description:
    "Manage your Pizzon account, orders, and settings in your personal dashboard.",
  openGraph: {
    title: "Dashboard | Pizzon Food Delivery",
    description:
      "Access your Pizzon dashboard to manage your orders, profile, and account settings easily.",
  },
};
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getAllCategories();

  return (
    <SidebarProvider>
      <SideBar categories={categories} />

      <main className="flex-1 min-w-0 p-4 bg-gray-300/50 min-h-screen">
        {children}
      </main>
    </SidebarProvider>
  );
}
