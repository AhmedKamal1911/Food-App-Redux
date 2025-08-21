"use server";

import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import prisma from "@/lib/prisma";
import { requirePermission } from "@/lib/server-utils";
import { ActionResponse } from "@/lib/types/shared";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function markTransactionDeliveredAction(
  _: unknown,
  formData: FormData
): ActionResponse {
  if (!requirePermission(["admin", "superAdmin"])) {
    return {
      status: "error",
      error: {
        message: "Unauthorized action",
        status: 401,
      },
    };
  }

  const result = z.string().safeParse(formData.get("orderId"));
  const orderId = result.data;
  if (!result.success)
    return {
      status: "validationError",
      error: { message: "Invalid Order ID", status: 400 },
    };
  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!existingOrder) {
      return {
        status: "error",
        error: { message: "Order not found", status: 404 },
      };
    }
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "delivered" },
    });

    // Revalidate any relevant paths if needed
    revalidateTag(PRISMA_CACHE_KEY.TRANSACTIONS);
    revalidateTag(`${PRISMA_CACHE_KEY.TRANSACTIONS}-${existingOrder.userId}`);
    console.log(
      `from mark as deliverd: ${PRISMA_CACHE_KEY.TRANSACTIONS}-${existingOrder.userId}`
    );
    return {
      status: "success",
      message: "Order Delivered Successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      error: { message: "Internal Server Error", status: 500 },
    };
  }
}
