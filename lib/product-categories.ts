import type { ProductCategory } from "@/types/admin";

/** All storefront / admin product categories */
export const PRODUCT_CATEGORIES = [
  "Winter Collection",
  "Cotton Elegant Embroidery Suit",
  "Jeans / Trousers",
  "Fancy Wear",
  "Unstitched",
  "Jewelry",
  "Coratia",
  "Handbags / Purse",
] as const satisfies readonly ProductCategory[];

/** Categories that do not need S/M/L size options or size charts */
export function isNoSizeCategory(category: string): boolean {
  return (
    category === "Unstitched" ||
    category === "Jewelry" ||
    category === "Coratia" ||
    category === "Handbags / Purse"
  );
}
