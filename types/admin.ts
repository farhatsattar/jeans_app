// Product Types
export type ProductCategory = "Shalwar Kameez" | "Kurta" | "Dupatta" | "Trouser";
export type ProductColor = "Red" | "Green" | "Blue" | "White" | "Black" | "Pink";
export type ProductSize = "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  discountPrice?: number;
  stock: number;
  sizes: ProductSize[];
  colors: ProductColor[];
  tags: string[];
  images: string[];
  sku: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  createdAt: string;
}

// Order Types
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: ProductSize;
  color: ProductColor;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

// Admin User Types
export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

// Store Settings Types
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}

export interface StoreSettings {
  storeName: string;
  logo: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socialLinks: SocialLinks;
  currency: string;
  currencySymbol: string;
  shippingCharges: number;
  freeShippingThreshold: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

export interface ChartDataPoint {
  date: string;
  label: string;
  revenue: number;
  orders: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  count: number;
}
