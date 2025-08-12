import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProductCategory } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronDown, ShoppingBasket } from "lucide-react";

import { useCategoryFilter } from "@/hooks/use-category-filter";
import LoadingScreen from "../../products/_components/loading-screen";
export default function ProductsMenuItemWithFilteration({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const pathname = usePathname();
  const isActive = pathname === "/dashboard/products";
  const { isMobile, state } = useSidebar();

  return (
    <Collapsible open={(isActive && state !== "collapsed") || isMobile}>
      <SidebarMenuItem>
        <Link href="/dashboard/products">
          <SidebarMenuButton
            className={`md:flex md:items-center md:gap-2 cursor-pointer  text-xl  rounded-sm py-5 ${
              isActive && "bg-primary/90! text-white!"
            }`}
          >
            {state === "collapsed" && !isMobile && <ShoppingBasket />}

            {isMobile && (
              <div className="flex items-center gap-2 flex-1">
                <ShoppingBasket />
                <span>Products</span>
              </div>
            )}

            {state === "expanded" && !isMobile && (
              <div className="flex items-center gap-2 flex-1">
                <ShoppingBasket />
                <span>Products</span>
              </div>
            )}

            <CollapsibleTrigger className="max-md:hidden" asChild>
              <span className="p-2 group data-[state=open]:rotate-180 transition-transform">
                <ChevronDown className="size-4" />
              </span>
            </CollapsibleTrigger>
          </SidebarMenuButton>
        </Link>

        <CollapsibleContent className="max-md:hidden pl-2  px-0 mt-2">
          <CategoryFilter categories={categories} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function CategoryFilter({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const {
    allSelected,
    filteredCategories,
    setSearch,
    toggleCategory,
    search,
    categoriesQuery,
    isPending,
  } = useCategoryFilter({ categories });
  return (
    <>
      {isPending && <LoadingScreen />}
      <Command className="rounded-sm border shadow-md w-full">
        <CommandInput
          value={search}
          onValueChange={(val) => setSearch(val)}
          placeholder="Filter Products..."
        />
        <CommandEmpty>No categories found.</CommandEmpty>
        <CommandGroup
          heading="Categories"
          className="overflow-y-scroll max-h-[180px]"
        >
          {filteredCategories.map((category) => (
            <CommandItem key={category.id}>
              <div className="flex items-center justify-between gap-2 relative w-full">
                <label
                  htmlFor={category.slug}
                  className={`text-[15px] flex-1 capitalize before:absolute before:inset-0 before:cursor-pointer ${category.id === "noCategory" && "text-rose-500"}`}
                >
                  {category.name}
                </label>
                <Checkbox
                  id={category.slug}
                  checked={
                    category.slug === "all"
                      ? allSelected
                      : categoriesQuery.includes(category.slug)
                  }
                  onCheckedChange={() => toggleCategory(category.slug)}
                  className="size-5 rounded-none border-secondary/50"
                />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </>
  );
}
