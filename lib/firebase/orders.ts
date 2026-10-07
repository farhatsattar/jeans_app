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
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Order, OrderStatus } from "@/types/admin";

const COLLECTION = "orders";

function transformOrder(id: string, data: Record<string, unknown>): Order {
  return {
    id,
    customerId: data.customerId as string,
    customerName: data.customerName as string,
    customerEmail: data.customerEmail as string,
    items: data.items as Order["items"],
    subtotal: data.subtotal as number,
    shipping: data.shipping as number,
    total: data.total as number,
    status: data.status as OrderStatus,
    shippingAddress: data.shippingAddress as Order["shippingAddress"],
    createdAt: (data.createdAt as Timestamp)?.toDate?.()?.toISOString() || new Date().toISOString(),
    updatedAt: (data.updatedAt as Timestamp)?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
}

export async function getAllOrders(): Promise<Order[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformOrder(doc.id, doc.data()));
}

export async function getOrder(id: string): Promise<Order | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return transformOrder(docSnap.id, docSnap.data());
}

export async function getOrdersByCustomer(customerId: string): Promise<Order[]> {
  const q = query(collection(db, COLLECTION), where("customerId", "==", customerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformOrder(doc.id, doc.data()));
}

export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  const q = query(collection(db, COLLECTION), where("status", "==", status));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => transformOrder(doc.id, doc.data()));
}

export async function createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteOrder(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
