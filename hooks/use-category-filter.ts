import { ProductCategory } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

export function useCategoryFilter({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const categorySlugs = useMemo(
    () => [...categories.map((c) => c.slug), "noCategory"].sort(),
    [categories]
  );
  const [allSelected, setAllSelected] = useState(false);

  const searchParams = useSearchParams();
  const categoriesQuery = useMemo(
    () => searchParams.get("cat")?.split(",").sort() ?? [],
    [searchParams]
  );

  const router = useRouter();

  const toggleCategory = (slug: string) => {
    if (slug === "all") {
      const isAllSelected = categoriesQuery.length === categorySlugs.length;
      setAllSelected(!isAllSelected);

      startTransition(() => {
        router.replace(isAllSelected ? "?" : `?cat=${categorySlugs.join(",")}`);
      });
    } else {
      const isSlugInQuery = categoriesQuery.includes(slug);
      const filteredCatQuery = (
        isSlugInQuery
          ? categoriesQuery.filter((s) => s !== slug)
          : [...categoriesQuery, slug]
      ).sort();
      startTransition(() => {
        router.replace(
          !filteredCatQuery.length ? "?" : `?cat=${filteredCatQuery.join(",")}`
        );
      });

      const isAllSelected = filteredCatQuery.length === categorySlugs.length;
      setAllSelected(isAllSelected);
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
      {
        id: "noCategory",
        slug: "noCategory",
        name: "no category",
      },
    ];
  }, [categories, search]);

  useEffect(() => {
    console.log({ categoriesQuery, categorySlugs });
    if (!categoriesQuery.length && categorySlugs.length) {
      console.log("from router useEffect");
      // If no categories selected yet → set all
      router.replace(`?cat=${categorySlugs.join(",")}`);
      setAllSelected(true);
    } else {
      // query has cats, categoryslugs is empty
      console.log("hey");
      setAllSelected(categoriesQuery.length === categorySlugs.length);
    }
  }, [categoriesQuery, categorySlugs, router]);

  return {
    filteredCategories,
    toggleCategory,
    allSelected,
    setSearch,
    search,
    categoriesQuery,
    isPending,
  };
}
