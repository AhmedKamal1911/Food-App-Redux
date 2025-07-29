import { Extra, Size } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(value: string): string {
  let digits = value.replace(/[^\d+]/g, "");

  if (!digits.startsWith("+")) {
    digits = "+" + digits;
  }

  if (digits.length > 3) digits = digits.slice(0, 3) + " " + digits.slice(3);
  if (digits.length > 7) digits = digits.slice(0, 7) + " " + digits.slice(7);
  if (digits.length > 11) digits = digits.slice(0, 11) + " " + digits.slice(11);
  if (digits.length > 15) digits = digits.slice(0, 15); // Limit max length

  return digits;
}

export function calcProductTotalPrice({
  productPrice,
  size,
  extras,
  qty = 1,
}: {
  productPrice: number;
  size: Size | undefined;
  extras: Extra[];
  qty?: number;
}) {
  return (
    (productPrice +
      (size?.price ?? 0) +
      extras.reduce((acc, curr) => acc + curr.price, 0)) *
    qty
  );
}

export function getBaseUrl() {
  console.dir(process.env.NEXT_PUBLIC_BASE_URL);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL)
    throw new Error(
      "NEXT_PUBLIC_BASE_URL is not defined in the environment variables."
    );
  return baseURL;
}
