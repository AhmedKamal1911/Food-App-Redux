import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductSlug(label: string) {
  return label.toLowerCase().replace(/\s/g, "-");
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
