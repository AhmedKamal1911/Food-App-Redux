import { getAllUsers } from "@/lib/server/queries/user";

import UsersTableSection from "./_components/users-table-section";
import { redirect, RedirectType } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description:
    "Manage user accounts and permissions in the Pizzon Dashboard. View user details, roles, and activity to keep the platform running smoothly.",
  openGraph: {
    title: "Users | Pizzon Food Delivery",
    description:
      "Administer user profiles, roles, and activities within the Pizzon Dashboard for efficient platform management.",
  },
};
export default async function UsersPage() {
  const users = await getAllUsers();
  if (!users) redirect("/", RedirectType.replace);
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <UsersTableSection data={users} />
    </div>
  );
}
