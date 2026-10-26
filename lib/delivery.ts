import type { ProductCategory } from "@/types/admin";

/** Jewelry-only delivery */
export const JEWELRY_DELIVERY = 100;

/** Cloth, Coratia, Handbags / Purse */
export const CLOTH_DELIVERY = 200;

const CLOTH_RATE_CATEGORIES: ReadonlySet<string> = new Set([
  "Winter Collection",
  "Cotton Elegant Embroidery Suit",
  "Jeans / Trousers",
  "Fancy Wear",
  "Unstitched",
  "Coratia",
  "Handbags / Purse",
]);

export function getDeliveryForCategory(
  category?: string | null
): number {
  if (!category) return CLOTH_DELIVERY;
  if (category === "Jewelry") return JEWELRY_DELIVERY;
  if (CLOTH_RATE_CATEGORIES.has(category)) return CLOTH_DELIVERY;
  return CLOTH_DELIVERY;
}

/** Cart delivery = highest rate among items (mixed cloth + jewelry → 200). */
export function getCartDelivery(
  items: Array<{ category?: string | null }>
): number {
  if (items.length === 0) return CLOTH_DELIVERY;
  return Math.max(...items.map((item) => getDeliveryForCategory(item.category)));
}

export function deliveryLabelForCategory(
  category?: ProductCategory | string | null
): string {
  return `Delivery Rs.${getDeliveryForCategory(category)}`;
}
