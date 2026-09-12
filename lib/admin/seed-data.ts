/**
 * Seed data for the admin dashboard.
 *
 * Run this once to populate Firebase with sample data.
 * You can run it from a browser console on the admin dashboard
 * or from any client-side code with Firebase initialized.
 */

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product, Category, Order, Customer, StoreSettings } from "@/types/admin";

export const sampleCategories: Omit<Category, "id" | "createdAt">[] = [
  {
    name: "Shalwar Kameez",
    slug: "shalwar-kameez",
    image: "/images/images.jfif",
    description: "Traditional Pakistani stitched Shalwar Kameez collection",
  },
  {
    name: "Kurta",
    slug: "kurta",
    image: "/images/image.jpg",
    description: "Premium stitched Kurta for men and women",
  },
  {
    name: "Dupatta",
    slug: "dupatta",
    image: "/images/images%20(5).jfif",
    description: "Beautiful embroidered and printed dupattas",
  },
  {
    name: "Trouser",
    slug: "trouser",
    image: "/images/images%20(6).jfif",
    description: "Premium stitched trousers and pants",
  },
];

export const sampleProducts: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Cotton Shalwar Kameez",
    description: "Comfortable cotton stitched Shalwar Kameez, perfect for everyday wear.",
    category: "Shalwar Kameez",
    price: 1499,
    discountPrice: 1299,
    stock: 50,
    sku: "SK-COT-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue"],
    tags: ["cotton", "summer", "casual"],
    images: ["/images/image.jpg", "/images/images%20(1).jfif"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Premium Lawn Shalwar Kameez",
    description: "Elegant lawn fabric stitched Shalwar Kameez with beautiful embroidery.",
    category: "Shalwar Kameez",
    price: 2499,
    stock: 30,
    sku: "SK-LWN-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Green"],
    tags: ["lawn", "embroidered", "premium"],
    images: ["/images/images.jfif", "/images/images%20(2).jfif"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Daily Wear Cotton Kurta",
    description: "Soft cotton stitched Kurta, ideal for daily wear with vibrant prints.",
    category: "Kurta",
    price: 1199,
    stock: 75,
    sku: "KUR-COT-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Blue"],
    tags: ["cotton", "daily", "casual"],
    images: ["/images/image.jpg"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Chiffon Dupatta",
    description: "Beautiful pure chiffon dupatta with delicate embellishments.",
    category: "Dupatta",
    price: 899,
    stock: 100,
    sku: "DUP-CHF-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink", "Blue"],
    tags: ["chiffon", "embroidered"],
    images: ["/images/images%20(1).jfif"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Silk Trouser",
    description: "Premium silk-blend stitched trouser with elegant drape and comfort.",
    category: "Trouser",
    price: 1299,
    stock: 60,
    sku: "TRS-SLK-001",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red"],
    tags: ["silk", "formal"],
    images: ["/images/images%20(2).jfif"],
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Printed Geometric Kurta",
    description: "Modern geometric print Kurta with pocket detail, perfect for casual outings.",
    category: "Kurta",
    price: 1399,
    stock: 40,
    sku: "KUR-GEO-001",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "White"],
    tags: ["geometric", "printed", "casual"],
    images: ["/images/images.jfif"],
    isFeatured: false,
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
        name: "Cotton Shalwar Kameez",
        image: "/images/image.jpg",
        price: 1499,
        quantity: 1,
        size: "M",
        color: "White",
      },
    ],
    subtotal: 1499,
    shipping: 200,
    total: 1699,
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
        name: "Premium Lawn Shalwar Kameez",
        image: "/images/images.jfif",
        price: 2499,
        quantity: 2,
        size: "L",
        color: "Red",
      },
    ],
    subtotal: 4998,
    shipping: 0,
    total: 4998,
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
        name: "Chiffon Dupatta",
        image: "/images/images%20(1).jfif",
        price: 899,
        quantity: 3,
        size: "M",
        color: "Pink",
      },
    ],
    subtotal: 2697,
    shipping: 200,
    total: 2897,
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
        name: "Silk Trouser",
        image: "/images/images%20(2).jfif",
        price: 1299,
        quantity: 1,
        size: "M",
        color: "Black",
      },
    ],
    subtotal: 1299,
    shipping: 200,
    total: 1499,
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

/**
 * Seeds the database with sample data.
 * Use this in a browser console or a special page.
 */
export async function seedDatabase(): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("seedDatabase must be called in the browser");
  }

  console.log("Seeding database...");

  // Seed categories
  for (const category of sampleCategories) {
    await addDoc(collection(db, "categories"), {
      ...category,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleCategories.length} categories`);

  // Seed products
  for (const product of sampleProducts) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleProducts.length} products`);

  // Seed customers
  for (const customer of sampleCustomers) {
    await addDoc(collection(db, "customers"), {
      ...customer,
      createdAt: serverTimestamp(),
    });
  }
  console.log(`✓ Added ${sampleCustomers.length} customers`);

  // Seed orders
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
