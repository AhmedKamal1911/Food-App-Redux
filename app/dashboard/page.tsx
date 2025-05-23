import { getAllUsers } from "@/lib/server/queries/user";
import UsersTable from "./_components/usersTable/users-table";

export default async function UsersPage() {
  const users = await getAllUsers();
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl capitalize font-semibold">users :</span>
        <div className="flex  gap-2 items-center">
          {/* <ProductsFilterInput table={table} /> */}
          {/* <ProductsCategoryFilter categories={categories} /> */}
          {/* <CreateCategoryModal /> */}
        </div>
      </div>
      <div className="mt-4">
        <UsersTable data={users} />
      </div>
    </div>
  );
}
