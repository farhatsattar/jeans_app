export type ProductCategory = "Men" | "Women" | "Skinny" | "Baggy";
export type ProductColor = "Blue" | "Black" | "Gray";
export type ProductSize = "S" | "M" | "L" | "XL";

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
    id: "classic-indigo-straight",
    name: "Classic Indigo Straight Jeans",
    category: "Men",
    price: 59,
    description: "Timeless straight fit denim with soft stretch and all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    rating: 4.6,
    reviews: 124,
    isFeatured: true,
  },
  {
    id: "urban-baggy-fit",
    name: "Urban Baggy Fit",
    category: "Baggy",
    price: 69,
    description: "Relaxed wide-leg silhouette inspired by contemporary streetwear.",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "Gray"],
    rating: 4.4,
    reviews: 88,
    isFeatured: true,
  },
  {
    id: "slim-sculpt-skinny",
    name: "Slim Sculpt Skinny",
    category: "Skinny",
    price: 64,
    description: "High-stretch skinny jeans designed for a sleek and tailored look.",
    images: [
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Gray"],
    rating: 4.8,
    reviews: 209,
    isFeatured: true,
    isNew: true,
  },
  {
    id: "midnight-tapered",
    name: "Midnight Tapered Denim",
    category: "Men",
    price: 72,
    description: "Premium dark-wash tapered jeans with modern finishing details.",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "Black"],
    rating: 4.7,
    reviews: 143,
    isNew: true,
  },
  {
    id: "everyday-high-rise",
    name: "Everyday High Rise",
    category: "Women",
    price: 58,
    description: "Clean high-rise silhouette with flattering stretch and soft denim.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Gray"],
    rating: 4.5,
    reviews: 97,
  },
  {
    id: "vintage-relaxed",
    name: "Vintage Relaxed Fit",
    category: "Women",
    price: 66,
    description: "Relaxed fit inspired by archival denim with effortless drape.",
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    rating: 4.3,
    reviews: 76,
  },
];
