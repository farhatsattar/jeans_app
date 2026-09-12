import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Category } from "@/types/admin";

const COLLECTION = "categories";

function transformCategory(id: string, data: Record<string, unknown>): Category {
  return {
    id,
    name: data.name as string,
    slug: data.slug as string,
    image: data.image as string,
    description: data.description as string,
    createdAt: (data.createdAt as Timestamp)?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const q = query(collection(db, COLLECTION), orderBy("name", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformCategory(doc.id, doc.data()));
}

export async function getCategory(id: string): Promise<Category | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return transformCategory(docSnap.id, docSnap.data());
}

export async function createCategory(data: Omit<Category, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
