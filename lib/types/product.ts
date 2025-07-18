import { Extra, Prisma, Size } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    extras: true;
    sizes: true;
  };
}>;
export type TransactionOrder = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        email: true;
      };
    };
    items: {
      include: {
        product: true;
        selectedSize: true;
        selectedExtras: true;
      };
    };
  };
}>;

export type CartProduct = ProductWithRelations & {
  qty: number;
  selectedSize: Size | undefined;
  selectedExtras: Extra[];
};
