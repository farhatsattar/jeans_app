import type { ProductCategory } from "@/types/admin";

/** All storefront / admin product categories */
export const PRODUCT_CATEGORIES = [
  "Winter Collection",
  "Cotton Elegant Embroidery Suit",
  "Jeans / Trousers",
  "Fancy Wear",
  "Unstitched",
  "Jewelry",
  "Coratia Designs",
  "Handbags / Purse",
] as const satisfies readonly ProductCategory[];

/** Normalize legacy category names from older products */
export function normalizeProductCategory(category: string): string {
  if (category === "Coratia") return "Coratia Designs";
  return category;
}

/** Categories that do not need S/M/L size options or size charts */
export function isNoSizeCategory(category: string): boolean {
  const name = normalizeProductCategory(category);
  return (
    name === "Unstitched" ||
    name === "Jewelry" ||
    name === "Coratia Designs" ||
    name === "Handbags / Purse"
  );
}
