import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: string;
}

const COLLECTION = "reviews";

function transformReview(id: string, data: Record<string, unknown>): ProductReview {
  return {
    id,
    productId: data.productId as string,
    productName: (data.productName as string) || "",
    customerId: data.customerId as string,
    customerName: (data.customerName as string) || "Customer",
    customerEmail: (data.customerEmail as string) || "",
    rating: Number(data.rating) || 0,
    comment: (data.comment as string) || "",
    imageUrl: (data.imageUrl as string) || undefined,
    createdAt:
      (data.createdAt as Timestamp)?.toDate?.()?.toISOString() ||
      new Date().toISOString(),
  };
}

export async function getReviewsByProduct(productId: string): Promise<ProductReview[]> {
  const q = query(
    collection(db, COLLECTION),
    where("productId", "==", productId),
    orderBy("createdAt", "desc")
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => transformReview(docSnap.id, docSnap.data()));
  } catch (error) {
    // Fallback if composite index is missing — still return reviews
    console.error("Ordered reviews query failed, falling back:", error);
    const fallback = query(
      collection(db, COLLECTION),
      where("productId", "==", productId)
    );
    const snapshot = await getDocs(fallback);
    return snapshot.docs
      .map((docSnap) => transformReview(docSnap.id, docSnap.data()))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export async function createReview(data: {
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  imageUrl?: string;
}): Promise<string> {
  const payload: Record<string, unknown> = {
    productId: data.productId,
    productName: data.productName,
    customerId: data.customerId,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    rating: Math.round(Number(data.rating)),
    comment: data.comment.trim(),
    createdAt: serverTimestamp(),
  };

  if (data.imageUrl) {
    payload.imageUrl = data.imageUrl;
  }

  const docRef = await addDoc(collection(db, COLLECTION), payload);
  return docRef.id;
}
