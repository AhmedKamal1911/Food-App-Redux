import prisma from "@/lib/prisma";
import { ProductWithRelations } from "@/lib/types/product";

import { NextRequest, NextResponse } from "next/server";

export type ProductsByPageResponse = {
  products: ProductWithRelations[];
  totalPages: number;
  page: number;
};
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get("page"));
  const pageSize = Number(searchParams.get("pageSize"));

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page < 1 || pageSize < 1) {
    return NextResponse.json(
      { error: { status: 400, message: "Invalid page number or page size." } },
      { status: 400 }
    );
  }
  try {
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      include: {
        category: true,
        extras: true,
        sizes: true,
      },
      take: pageSize,
    });

    return NextResponse.json<ProductsByPageResponse>({
      products,
      totalPages,
      page,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({
      error: {
        status: 500,
        message: "Internal server error.",
      },
    });
  }
}
