"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategoryFilter } from "@/hooks/use-category-filter";
import { ProductCategory } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import LoadingScreen from "./loading-screen";

export default function ProductsCategoryFilter({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const [open, setOpen] = useState(false);

  const {
    allSelected,
    filteredCategories,
    setSearch,
    toggleCategory,
    search,
    categoriesQuery,
    isPending,
  } = useCategoryFilter({ categories });
  console.log({ filteredCategories, isPending });
  return (
    <>
      {isPending && <LoadingScreen />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-white justify-between max-md:flex hidden text-gray-500 hover:text-black"
          >
            Select Products Category...
            <ChevronsUpDown className="opacity-50 t" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
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
                      className="text-[15px] flex-1 capitalize before:absolute before:inset-0 before:cursor-pointer"
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
        </PopoverContent>
      </Popover>
    </>
  );
}
