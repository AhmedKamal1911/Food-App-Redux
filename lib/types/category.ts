import { ProductCategory } from "@prisma/client";

export type CategoriesNameList = Array<ProductCategory["name"] | "all">;
