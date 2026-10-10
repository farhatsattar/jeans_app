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
  const createdAtValue = data.createdAt as Timestamp | string | undefined;
  const createdAt =
    typeof createdAtValue === "object" && createdAtValue && "toDate" in createdAtValue
      ? createdAtValue.toDate().toISOString()
      : typeof createdAtValue === "string"
        ? createdAtValue
        : new Date().toISOString();

  return {
    id,
    name:
      (data.name as string) ||
      (data.displayName as string) ||
      (data.email as string)?.split("@")[0] ||
      "Customer",
    email: (data.email as string) || "",
    phone: (data.phone as string) || "",
    totalOrders: Number(data.totalOrders) || 0,
    totalSpent: Number(data.totalSpent) || 0,
    createdAt,
  };
}

export async function getAllCustomers(): Promise<Customer[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) =>
      transformCustomer(docSnap.id, docSnap.data())
    );
  } catch (error) {
    // Fallback when index/createdAt is missing
    console.error("Ordered customers query failed, falling back:", error);
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs
      .map((docSnap) => transformCustomer(docSnap.id, docSnap.data()))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return transformCustomer(docSnap.id, docSnap.data());
}

export async function createCustomer(
  data: Omit<Customer, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCustomer(
  id: string,
  data: Partial<Customer>
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), data);
}
