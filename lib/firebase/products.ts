import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Product, ProductCategory } from "@/types/admin";

const COLLECTION = "products";

function transformProduct(id: string, data: Record<string, unknown>): Product {
  return {
    id,
    name: data.name as string,
    description: data.description as string,
    category: data.category as ProductCategory,
    price: data.price as number,
    discountPrice: data.discountPrice as number | undefined,
    stock: data.stock as number,
    sizes: data.sizes as Product["sizes"],
    colors: data.colors as Product["colors"],
    tags: data.tags as string[],
    images: data.images as string[],
    sku: data.sku as string,
    isFeatured: data.isFeatured as boolean,
    isActive: data.isActive as boolean,
    kameezChart: data.kameezChart as Product["kameezChart"],
    shalwarChart: data.shalwarChart as Product["shalwarChart"],
    createdAt: (data.createdAt as Timestamp)?.toDate?.()?.toISOString() || (data.createdAt as string) || new Date().toISOString(),
    updatedAt: (data.updatedAt as Timestamp)?.toDate?.()?.toISOString() || (data.updatedAt as string) || new Date().toISOString(),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformProduct(doc.id, doc.data()));
}

export async function getProduct(id: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return transformProduct(docSnap.id, docSnap.data());
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), where("category", "==", category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformProduct(doc.id, doc.data()));
}

function stripUndefined<T extends Record<string, unknown>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as T;
}

export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(
    collection(db, COLLECTION),
    stripUndefined({
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
  return docRef.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(
    doc(db, COLLECTION, id),
    stripUndefined({
      ...data,
      updatedAt: serverTimestamp(),
    })
  );
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
