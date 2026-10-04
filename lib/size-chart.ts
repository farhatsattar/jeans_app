export type ChartSize = "S" | "M" | "L" | "XL";

export interface KameezSizeSpec {
  size: ChartSize;
  chest: number;
  length: number;
  hip: number;
  flair: number;
}

export interface ShalwarSizeSpec {
  length: string;
  stretchBelt: string;
  pancha: string;
}

/** Default size chart inspired by Ambreen Clothing khaddar stitched 3pc specs */
export const DEFAULT_KAMEEZ_CHART: KameezSizeSpec[] = [
  { size: "S", chest: 20, length: 42, hip: 22, flair: 24 },
  { size: "M", chest: 21, length: 43, hip: 23, flair: 25 },
  { size: "L", chest: 23, length: 43, hip: 25, flair: 27 },
  { size: "XL", chest: 24, length: 43, hip: 26, flair: 28 },
];

export const DEFAULT_SHALWAR_CHART: ShalwarSizeSpec = {
  length: "38-39",
  stretchBelt: "24-25",
  pancha: "10 inches",
};

export const STORE_CATEGORIES = [
  "Winter Collection",
  "Cotton Elegant Embroidery Suit",
  "Jeans / Trousers",
  "Fancy Wear",
  "Jewelry",
  "Handbags / Purse",
] as const;

export type StoreCategory = (typeof STORE_CATEGORIES)[number];
