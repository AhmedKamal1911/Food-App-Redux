import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const products = await prisma.product.findMany({
      include: { category: true, extras: true, sizes: true },
      take: Number(limit),
      cursor: {
        id: myCursor,
      },
    });
    const myCursor = products[0].id;
    return products;
  } catch (err) {}
}
