import { Extra, Prisma, Size } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    extras: true;
    sizes: true;
  };
}>;

export type CartProduct = ProductWithRelations & {
  qty: number;
  selectedSize: Size | undefined;
  selectedExtras: Extra[];
};
