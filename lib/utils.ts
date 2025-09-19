import { Extra, Size } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { addMonths, startOfMonth, subMonths } from "date-fns";
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

export function getResendEmailLogoUrl() {
  const logoUrl = process.env.NEXT_PUBLIC_RESEND_EMAIL_LOGO_URL;
  if (!logoUrl)
    throw new Error(
      "RESEND_EMAIL_LOGO_URL is not defined in the environment variables."
    );
  return logoUrl;
}

export function calculateGrowthPercentage(
  current: number,
  previous: number
): string {
  if (previous === 0) return "0";
  const percent = ((current - previous) / previous) * 100;
  return percent.toFixed(2);
}

export function formatAmount(amountInCents: number): string {
  return (amountInCents / 100).toFixed(2);
}

export function getCurrentAndPreviousMonthRange() {
  const now = new Date();

  // بداية الشهر الحالي
  const startOfCurrentMonth = startOfMonth(now);

  // بداية الشهر القادم
  const startOfNextMonth = startOfMonth(addMonths(now, 1));

  // بداية الشهر السابق
  const startOfPrevMonth = startOfMonth(subMonths(now, 1));

  return {
    startOfCurrentMonth,
    startOfNextMonth,
    startOfPrevMonth,
  };
}

export function extractPublicIdFromUrl(url: string): string {
  // مثال: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/folder/file-name.jpg
  const parts = url.split("/upload/");
  if (parts.length < 2) return "";

  const pathWithVersion = parts[1]; // v1234567890/folder/file.jpg
  const pathSegments = pathWithVersion.split("/");

  // نشيل الـ version (أول segment بيبدأ بـ v)
  if (pathSegments[0].startsWith("v")) {
    pathSegments.shift();
  }

  // نجمع باقي المسار ونشيل الامتداد
  return pathSegments.join("/").replace(/\.[^/.]+$/, "");
}
