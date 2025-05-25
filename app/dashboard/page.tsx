import { getAllUsers } from "@/lib/server/queries/user";

import UsersTableSection from "./_components/users-table-section";

export default async function UsersPage() {
  const users = await getAllUsers();
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <UsersTableSection data={users} />
    </div>
  );
}
