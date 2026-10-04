export type ProductCategory =
  | "Winter Collection"
  | "Cotton Elegant Embroidery Suit"
  | "Jeans / Trousers"
  | "Fancy Wear"
  | "Jewelry"
  | "Handbags / Purse";
export type ProductColor =
  | "Red"
  | "Green"
  | "Blue"
  | "White"
  | "Black"
  | "Pink"
  | "Orange"
  | "Ivory"
  | "Maroon"
  | "Gold"
  | "Champagne"
  | "Beige"
  | "Navy"
  | "Gray"
  | "Burgundy"
  | "Violet";
export type ProductSize = "S" | "M" | "L" | "XL" | "One Size";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  rating: number;
  reviews: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "binsaeed-zari-khaddar-violet",
    name: "Binsaeed Zari Khaddar Stitched Shalwar Kameez 3pc",
    category: "Winter Collection",
    price: 3950,
    description:
      "Expertly tailored Binsaeed khaddar stitched shalwar kameez 3pc set. Made from premium khaddar for style and comfort. Includes chadder 2.5 meter.",
    images: [
      "/images/images.jfif",
      "/images/images%20(1).jfif",
      "/images/images%20(2).jfif",
      "/images/images3.jfif",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Violet", "Maroon"],
    rating: 4.8,
    reviews: 42,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "classic-khaddar-suit",
    name: "Classic Solid Khaddar Suit",
    category: "Winter Collection",
    price: 3499,
    description: "Warm solid khaddar stitched 3pc suit for winter everyday wear.",
    images: [
      "/images/image.jpg",
      "/images/images%20(2).jfif",
      "/images/images%20(5).jfif",
      "/images/images.jfif",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Navy"],
    rating: 4.6,
    reviews: 68,
    isFeatured: true,
  },
  {
    id: "embroidered-khaddar-suit",
    name: "Embroidered Khaddar 3pc",
    category: "Winter Collection",
    price: 4299,
    description: "Premium embroidered khaddar stitched suit with refined detailing.",
    images: ["/images/images%20(5).jfif", "/images/images.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Black"],
    rating: 4.7,
    reviews: 55,
    isFeatured: true,
  },
  {
    id: "white-cotton-embroidery-suit",
    name: "White Cotton Elegant Embroidery Suit",
    category: "Cotton Elegant Embroidery Suit",
    price: 3999,
    description: "Elegant white cotton embroidery suit with delicate thread work for formal occasions.",
    images: ["/images/kurta.jfif", "/images/kurta1.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Ivory"],
    rating: 4.7,
    reviews: 56,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "daily-cotton-embroidery-suit",
    name: "Daily Wear Cotton Embroidery Suit",
    category: "Cotton Elegant Embroidery Suit",
    price: 2499,
    description: "Soft cotton elegant embroidery suit for comfortable everyday styling.",
    images: ["/images/kurta1.jfif", "/images/kurta2.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Green"],
    rating: 4.5,
    reviews: 97,
    isFeatured: true,
  },
  {
    id: "printed-cotton-embroidery-suit",
    name: "Printed Cotton Elegant Embroidery Suit",
    category: "Cotton Elegant Embroidery Suit",
    price: 2799,
    description: "Modern printed cotton elegant embroidery suit with clean cut and easy fit.",
    images: ["/images/kurta2.jfif", "/images/kurta.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White"],
    rating: 4.4,
    reviews: 62,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "classic-blue-jeans",
    name: "Classic Blue Jeans",
    category: "Jeans / Trousers",
    price: 2499,
    description: "Comfortable classic blue jeans with a clean straight fit for everyday wear.",
    images: ["/images/tr2.jfif", "/images/tr3.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    rating: 4.6,
    reviews: 76,
    isFeatured: true,
  },
  {
    id: "slim-fit-trousers",
    name: "Slim Fit Trousers",
    category: "Jeans / Trousers",
    price: 2299,
    description: "Tailored slim-fit trousers with soft stretch for office and casual styling.",
    images: ["/images/tr3.jfif", "/images/tr4.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    rating: 4.7,
    reviews: 58,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "wide-leg-denim-trousers",
    name: "Wide Leg Denim Trousers",
    category: "Jeans / Trousers",
    price: 2699,
    description: "Trendy wide-leg denim trousers with a modern flowing silhouette.",
    images: ["/images/tr4.jfif", "/images/tr2.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Gray"],
    rating: 4.5,
    reviews: 45,
    isFeatured: true,
  },
  {
    id: "red-fancy-lehenga",
    name: "Red Fancy Lehenga",
    category: "Fancy Wear",
    price: 8999,
    description: "Stunning red lehenga with heavy zari work for weddings and festive occasions.",
    images: ["/images/images.jfif", "/images/images%20(2).jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Maroon", "Gold"],
    rating: 4.9,
    reviews: 34,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "embroidery-fancy-suit",
    name: "Heavy Embroidery Fancy Suit",
    category: "Fancy Wear",
    price: 7499,
    description: "Fine embroidery fancy wear suit with matching tape for weddings.",
    images: ["/images/kurta.jfif", "/images/kurta1.jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Pink"],
    rating: 4.8,
    reviews: 112,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "velvet-fancy-outfit",
    name: "Velvet Fancy Outfit",
    category: "Fancy Wear",
    price: 7999,
    description: "Rich velvet fancy outfit designed for formal winter gatherings.",
    images: ["/images/images3.jfif", "/images/images%20(6).jfif"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Burgundy", "Navy"],
    rating: 4.7,
    reviews: 39,
    isFeatured: true,
  },
  {
    id: "gold-pearl-necklace-set",
    name: "Gold Pearl Necklace Set",
    category: "Jewelry",
    price: 2499,
    description: "Elegant gold-tone pearl necklace set with matching earrings — perfect for party and bridal looks.",
    images: [
      "/images/jewelry-pearl-set.jpg",
      "/images/jewelry-kundan-set.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Gold", "Champagne"],
    rating: 4.8,
    reviews: 47,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "kundan-bridal-jewelry-set",
    name: "Kundan Bridal Jewelry Set",
    category: "Jewelry",
    price: 4599,
    description: "Traditional kundan jewelry set with necklace, earrings and teeka for weddings and festive wear.",
    images: [
      "/images/jewelry-kundan-set.jpg",
      "/images/jewelry-pearl-set.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Gold", "Red"],
    rating: 4.9,
    reviews: 33,
    isFeatured: true,
  },
  {
    id: "classic-black-handbag",
    name: "Classic Black Handbag",
    category: "Handbags / Purse",
    price: 2999,
    description: "Structured black handbag with gold hardware — ideal for everyday and formal styling.",
    images: [
      "/images/handbag-black.jpg",
      "/images/purse-clutch.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Black", "Beige"],
    rating: 4.6,
    reviews: 51,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "embroidered-clutch-purse",
    name: "Embroidered Clutch Purse",
    category: "Handbags / Purse",
    price: 1899,
    description: "Compact embroidered clutch purse for parties, weddings and evening events.",
    images: [
      "/images/purse-clutch.jpg",
      "/images/handbag-black.jpg",
    ],
    sizes: ["One Size"],
    colors: ["Maroon", "Gold"],
    rating: 4.7,
    reviews: 28,
    isFeatured: true,
  },
];
