/** Short label shown on review cards (e.g. homepage badge). */
export function getReviewCategoryLabel(
  category?: string,
  productName?: string
): string {
  const value = (category || productName || "").trim();
  if (!value) return "Haa-Meem";

  const lower = value.toLowerCase();

  if (lower.includes("cotton") || lower.includes("embroidery suit")) {
    return "Cotton";
  }
  if (lower.includes("winter") || lower.includes("khaddar")) {
    return "Winter Collection";
  }
  if (lower.includes("jean") || lower.includes("trouser")) {
    return "Jeans / Trousers";
  }
  if (lower.includes("fancy")) {
    return "Fancy Wear";
  }
  if (lower.includes("jewel")) {
    return "Jewelry";
  }
  if (lower.includes("handbag") || lower.includes("purse")) {
    return "Handbags / Purse";
  }

  // Prefer category as-is when known; avoid long product titles on badges
  if (category) return category;
  return "Haa-Meem";
}
