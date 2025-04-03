import { Prisma, ProductCategory } from "@prisma/client";
import { ProductWithRelations } from "./product";

export type CategoriesNameList = Array<ProductCategory["name"] | "all">;

export type CategoryWithPaginatedProducts = Omit<
  Prisma.ProductCategoryGetPayload<{
    include: { products: true; _count: true };
  }>,
  "products"
> & {
  products: { data: ProductWithRelations[]; totalPages: number; page: number };
};
