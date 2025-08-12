import prisma from "@/lib/prisma";
import { ProductWithRelations } from "@/lib/types/product";
import { NextRequest, NextResponse } from "next/server";
export type ProductsResponse = { data: ProductWithRelations[] };
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productIdsParam = searchParams.get("ids");
  const productsIds =
    productIdsParam === "" || !productIdsParam
      ? []
      : productIdsParam.split(",");

  if (!productsIds.length)
    return NextResponse.json(
      { error: "Missing product IDs" },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  try {
    const products = await prisma.product.findMany({
      where: {
        id: { in: productsIds },
      },
      include: {
        category: true,
        extras: true,
        sizes: true,
      },
    });
    return NextResponse.json<ProductsResponse>({ data: products });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "An Error Occurred!" },
      { status: 500, statusText: "internal Server Error" }
    );
  }
}
