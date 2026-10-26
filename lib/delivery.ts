import type { ProductCategory } from "@/types/admin";

/** Jewelry delivery */
export const JEWELRY_DELIVERY = 150;

/** Cloth + Coratia delivery */
export const CLOTH_DELIVERY = 200;

const CLOTH_OR_CORATIA: ReadonlySet<string> = new Set([
  "Winter Collection",
  "Cotton Elegant Embroidery Suit",
  "Jeans / Trousers",
  "Fancy Wear",
  "Unstitched",
  "Coratia",
]);

export function getDeliveryForCategory(
  category?: string | null
): number {
  if (!category) return CLOTH_DELIVERY;
  if (category === "Jewelry") return JEWELRY_DELIVERY;
  if (CLOTH_OR_CORATIA.has(category)) return CLOTH_DELIVERY;
  // Handbags / Purse and any other category
  if (category === "Handbags / Purse") return JEWELRY_DELIVERY;
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
