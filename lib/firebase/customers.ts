import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Customer } from "@/types/admin";

const COLLECTION = "customers";

function transformCustomer(id: string, data: Record<string, unknown>): Customer {
  return {
    id,
    name: data.name as string,
    email: data.email as string,
    phone: data.phone as string,
    totalOrders: data.totalOrders as number,
    totalSpent: data.totalSpent as number,
    createdAt: (data.createdAt as Timestamp)?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
}

export async function getAllCustomers(): Promise<Customer[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformCustomer(doc.id, doc.data()));
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return transformCustomer(docSnap.id, docSnap.data());
}

export async function createCustomer(data: Omit<Customer, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCustomer(id: string, data: Partial<Customer>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}
