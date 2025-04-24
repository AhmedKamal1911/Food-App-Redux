import { ProductCategory } from "@prisma/client";
import { createContext, ReactNode, use } from "react";

const CategoriesContext = createContext<ProductCategory[] | null>(null);

export default function CategoriesProvider({
  children,
  categories,
}: {
  children: ReactNode;
  categories: ProductCategory[];
}) {
  return <CategoriesContext value={categories}>{children}</CategoriesContext>;
}

export function useCategoriesContext() {
  const context = use(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategoriesContext must be used within a CategoriesProvider"
    );
  }
  return context;
}
