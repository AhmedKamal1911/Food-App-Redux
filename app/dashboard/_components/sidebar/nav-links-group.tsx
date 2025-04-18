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
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProductCategory } from "@prisma/client";

import { Calendar, ChevronDown, Home, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },

  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
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
                  className={`text-xl  rounded-sm py-5 ${
                    isActive && "bg-primary/90! text-white!"
                  }`}
                  asChild
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
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

function ProductsMenuItemWithFilteration({
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
  const [search, setSearch] = useState("");
  const categorySlugs = useMemo(
    () => categories.map((c) => c.slug).sort(),
    [categories]
  );
  const [allSelected, setAllSelected] = useState(false);

  const searchParams = useSearchParams();
  const categoriesQuery = searchParams.get("cat")?.split(",").sort() ?? [];

  const router = useRouter();

  const toggleCategory = (slug: string) => {
    if (slug === "all") {
      console.log(slug);

      const isAllSelected = categoriesQuery?.length === categorySlugs.length;
      setAllSelected(!isAllSelected);
      console.log({ isAllSelected });
      router.replace(isAllSelected ? "?" : `?cat=${categorySlugs.join(",")}`);
    } else {
      const isSlugInQuery = categoriesQuery?.includes(slug);
      const filteredCatQuery = (
        isSlugInQuery
          ? categoriesQuery?.filter((s) => s !== slug)
          : [...(categoriesQuery ?? []), slug]
      ).sort();

      router.replace(
        !filteredCatQuery.length ? "?" : `?cat=${filteredCatQuery.join(",")}`
      );
      const isAllSelected = filteredCatQuery?.length === categorySlugs.length;
      setAllSelected(isAllSelected);
      console.log({ filteredCatQuery });
    }
  };

  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((cat) =>
      cat.slug.toLowerCase().includes(search.toLowerCase())
    );

    return [
      {
        id: "all",
        slug: "all",
        name: "All",
      },
      ...filtered,
    ];
  }, [categories, search]);

  useEffect(() => {
    console.log({ mounted: categorySlugs });
    router.replace(`?cat=${categorySlugs.join(",")}`);
    setAllSelected(true);
  }, [categorySlugs, router]);

  return (
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
  );
}
