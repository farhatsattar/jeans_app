/**
 * Seed data for the admin dashboard.
 *
 * Run this once to populate Firebase with sample data.
 */

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product, Category, Order, Customer, StoreSettings } from "@/types/admin";
import { DEFAULT_KAMEEZ_CHART, DEFAULT_SHALWAR_CHART } from "@/lib/size-chart";

export const sampleCategories: Omit<Category, "id" | "createdAt">[] = [
  {
    name: "Winter Collection",
    slug: "winter-collection",
    image: "/images/images.jfif",
    description: "Warm winter suits and seasonal stitched wear for cold weather",
  },
  {
    name: "Cotton Elegant Embroidery Suit",
    slug: "cotton-elegant-embroidery-suit",
    image: "/images/kurta.jfif",
    description: "Premium cotton elegant embroidery suits for daily and formal styling",
  },
  {
    name: "Jeans / Trousers",
    slug: "jeans-trousers",
    image: "/images/tr2.jfif",
    description: "Comfortable jeans and tailored trousers collection",
  },
  {
    name: "Fancy Wear",
    slug: "fancy-wear",
    image: "/images/images%20(2).jfif",
    description: "Luxury fancy outfits for weddings and special occasions",
  },
  {
    name: "Jewelry",
    slug: "jewelry",
    image: "/images/jewelry-pearl-set.jpg",
    description: "Elegant jewelry sets for parties, bridal and festive looks",
  },
  {
    name: "Handbags / Purse",
    slug: "handbags-purse",
    image: "/images/handbag-black.jpg",
    description: "Stylish handbags and clutches for everyday and occasions",
  },
];

export const sampleProducts: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Binsaeed Zari Khaddar Stitched 3pc",
    description:
      "Expertly tailored Binsaeed khaddar stitched shalwar kameez 3pc set. Made from premium khaddar. Includes chadder 2.5 meter.",
    category: "Winter Collection",
    price: 3950,
    stock: 40,
    sku: "KHD-BIN-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Violet", "Maroon"],
    tags: ["khaddar", "binsaeed", "winter"],
    images: ["/images/images.jfif", "/images/images%20(1).jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Classic Solid Khaddar Suit",
    description: "Warm solid khaddar stitched 3pc suit for winter everyday wear.",
    category: "Winter Collection",
    price: 3499,
    discountPrice: 3199,
    stock: 50,
    sku: "KHD-SOL-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Navy"],
    tags: ["khaddar", "solid", "winter"],
    images: ["/images/image.jpg", "/images/images%20(2).jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "White Cotton Elegant Embroidery Suit",
    description: "Elegant white cotton embroidery suit with delicate thread work.",
    category: "Cotton Elegant Embroidery Suit",
    price: 3999,
    stock: 35,
    sku: "CES-WHT-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Ivory"],
    tags: ["cotton", "embroidery", "formal"],
    images: ["/images/kurta.jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Daily Wear Cotton Embroidery Suit",
    description: "Soft cotton elegant embroidery suit for comfortable everyday styling.",
    category: "Cotton Elegant Embroidery Suit",
    price: 2499,
    stock: 75,
    sku: "CES-COT-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Green"],
    tags: ["cotton", "embroidery", "daily"],
    images: ["/images/kurta1.jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Classic Blue Jeans",
    description: "Comfortable classic blue jeans with a clean straight fit.",
    category: "Jeans / Trousers",
    price: 2499,
    stock: 40,
    sku: "JNS-BLU-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    tags: ["jeans", "denim", "casual"],
    images: ["/images/tr2.jfif", "/images/tr3.jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Slim Fit Trousers",
    description: "Tailored slim-fit trousers with soft stretch for everyday wear.",
    category: "Jeans / Trousers",
    price: 2299,
    stock: 35,
    sku: "TRS-SLM-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    tags: ["trousers", "slim-fit", "casual"],
    images: ["/images/tr3.jfif", "/images/tr4.jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Red Fancy Lehenga",
    description: "Stunning red lehenga with heavy zari work for weddings.",
    category: "Fancy Wear",
    price: 8999,
    stock: 15,
    sku: "FNY-LHG-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Maroon", "Gold"],
    tags: ["fancy", "wedding", "lehenga"],
    images: ["/images/images%20(2).jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Heavy Embroidery Fancy Suit",
    description: "Fine embroidery fancy wear suit for weddings and events.",
    category: "Fancy Wear",
    price: 7499,
    stock: 18,
    sku: "FNY-EMB-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Pink"],
    tags: ["fancy", "embroidery", "wedding"],
    images: ["/images/kurta.jfif"],
    isFeatured: true,
    isActive: true,
    kameezChart: DEFAULT_KAMEEZ_CHART,
    shalwarChart: DEFAULT_SHALWAR_CHART,
  },
  {
    name: "Gold Pearl Necklace Set",
    description: "Elegant gold-tone pearl necklace set with matching earrings.",
    category: "Jewelry",
    price: 2499,
    stock: 45,
    sku: "JWL-PRL-001",
    sizes: ["One Size"],
    colors: ["Gold", "Champagne"],
    tags: ["jewelry", "pearl", "party"],
    images: ["/images/jewelry-pearl-set.jpg", "/images/jewelry-kundan-set.jpg"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Kundan Bridal Jewelry Set",
    description: "Traditional kundan jewelry set for weddings and festive wear.",
    category: "Jewelry",
    price: 4599,
    stock: 20,
    sku: "JWL-KDN-001",
    sizes: ["One Size"],
    colors: ["Gold", "Red"],
    tags: ["jewelry", "kundan", "bridal"],
    images: ["/images/jewelry-kundan-set.jpg", "/images/jewelry-pearl-set.jpg"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Classic Black Handbag",
    description: "Structured black handbag with gold hardware for everyday and formal use.",
    category: "Handbags / Purse",
    price: 2999,
    stock: 30,
    sku: "BAG-BLK-001",
    sizes: ["One Size"],
    colors: ["Black", "Beige"],
    tags: ["handbag", "purse", "everyday"],
    images: ["/images/handbag-black.jpg", "/images/purse-clutch.jpg"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Embroidered Clutch Purse",
    description: "Compact embroidered clutch for parties and evening events.",
    category: "Handbags / Purse",
    price: 1899,
    stock: 40,
    sku: "BAG-CLT-001",
    sizes: ["One Size"],
    colors: ["Maroon", "Gold"],
    tags: ["clutch", "purse", "party"],
    images: ["/images/purse-clutch.jpg", "/images/handbag-black.jpg"],
    isFeatured: true,
    isActive: true,
  },
];

export const sampleCustomers: Omit<Customer, "id" | "createdAt">[] = [
  {
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 300 1234567",
    totalOrders: 3,
    totalSpent: 4500,
  },
  {
    name: "Fatima Ali",
    email: "fatima@example.com",
    phone: "+92 301 2345678",
    totalOrders: 5,
    totalSpent: 8900,
  },
  {
    name: "Zainab Ahmed",
    email: "zainab@example.com",
    phone: "+92 302 3456789",
    totalOrders: 2,
    totalSpent: 2400,
  },
  {
    name: "Hira Malik",
    email: "hira@example.com",
    phone: "+92 303 4567890",
    totalOrders: 1,
    totalSpent: 1499,
  },
];

export const sampleOrders: Omit<Order, "id" | "createdAt" | "updatedAt">[] = [
  {
    customerId: "cust-1",
    customerName: "Ayesha Khan",
    customerEmail: "ayesha@example.com",
    items: [
      {
        productId: "prod-1",
        name: "Binsaeed Zari Khaddar Stitched 3pc",
        image: "/images/images.jfif",
        price: 3950,
        quantity: 1,
        size: "M",
        color: "Violet",
      },
    ],
    subtotal: 3950,
    shipping: 200,
    total: 4150,
    status: "delivered",
    shippingAddress: {
      fullName: "Ayesha Khan",
      address: "House 123, Street 4, Gulshan",
      city: "Karachi",
      phone: "+92 300 1234567",
    },
  },
  {
    customerId: "cust-2",
    customerName: "Fatima Ali",
    customerEmail: "fatima@example.com",
    items: [
      {
        productId: "prod-2",
        name: "White Cotton Elegant Embroidery Suit",
        image: "/images/image.jpg",
        price: 3999,
        quantity: 1,
        size: "L",
        color: "White",
      },
    ],
    subtotal: 3999,
    shipping: 0,
    total: 3999,
    status: "shipped",
    shippingAddress: {
      fullName: "Fatima Ali",
      address: "House 456, Block B, DHA",
      city: "Lahore",
      phone: "+92 301 2345678",
    },
  },
  {
    customerId: "cust-3",
    customerName: "Zainab Ahmed",
    customerEmail: "zainab@example.com",
    items: [
      {
        productId: "prod-3",
        name: "Classic Blue Jeans",
        image: "/images/images.jfif",
        price: 5499,
        quantity: 1,
        size: "M",
        color: "Red",
      },
    ],
    subtotal: 5499,
    shipping: 200,
    total: 5699,
    status: "processing",
    shippingAddress: {
      fullName: "Zainab Ahmed",
      address: "Flat 12, Building 3, F-7",
      city: "Islamabad",
      phone: "+92 302 3456789",
    },
  },
  {
    customerId: "cust-4",
    customerName: "Hira Malik",
    customerEmail: "hira@example.com",
    items: [
      {
        productId: "prod-4",
        name: "Red Fancy Lehenga",
        image: "/images/images%20(2).jfif",
        price: 8999,
        quantity: 1,
        size: "M",
        color: "Red",
      },
    ],
    subtotal: 8999,
    shipping: 200,
    total: 9199,
    status: "pending",
    shippingAddress: {
      fullName: "Hira Malik",
      address: "House 789, PECHS",
      city: "Karachi",
      phone: "+92 303 4567890",
    },
  },
];

export const defaultSettings: StoreSettings = {
  storeName: "ClothHub",
  logo: "",
  email: "support@clothhub.com",
  phone: "+92 300 0000000",
  whatsapp: "+923000000000",
  address: "Karachi, Pakistan",
  socialLinks: {
    facebook: "https://facebook.com/clothhub",
    instagram: "https://instagram.com/clothhub",
    twitter: "",
  },
  currency: "PKR",
  currencySymbol: "Rs.",
  shippingCharges: 200,
  freeShippingThreshold: 5000,
};

export async function seedDatabase(): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("seedDatabase must be called in the browser");
  }

  console.log("Seeding database...");

  for (const category of sampleCategories) {
    await addDoc(collection(db, "categories"), {
      ...category,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleCategories.length} categories`);

  for (const product of sampleProducts) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleProducts.length} products`);

  for (const customer of sampleCustomers) {
    await addDoc(collection(db, "customers"), {
      ...customer,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleCustomers.length} customers`);

  for (const order of sampleOrders) {
    await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleOrders.length} orders`);

  console.log("✅ Database seeded successfully!");
}
