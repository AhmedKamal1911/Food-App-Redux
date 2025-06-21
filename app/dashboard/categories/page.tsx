import { getAllCategories } from "@/lib/server/queries";
import CategoriesTable from "./_components/categoriesTable/categories-table";
import CreateCategoryModal from "./_components/modals/create-category-modal";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <div className="bg-white rounded-sm min-h-full p-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl capitalize font-semibold">categories :</span>
        <div className="flex  gap-2 items-center">
          <CreateCategoryModal />
        </div>
      </div>
      <div className="mt-4">
        <CategoriesTable data={categories} />
      </div>
    </div>
  );
}
