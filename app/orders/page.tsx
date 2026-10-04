"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Package } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/firebase/config";
import { getOrdersByCustomer } from "@/lib/firebase/orders";
import type { Order } from "@/types/admin";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const data = await getOrdersByCustomer(user.uid);
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sorted);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">My Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Track and view your Haa-Meem orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <Package className="mx-auto size-10 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-medium">No orders yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            When you place an order, it will show up here.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  #{order.id.slice(-8).toUpperCase()}
                </p>
                <p className="mt-1 font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-PK", {
                    dateStyle: "medium",
                  })}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""} • Rs.
                  {order.total.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="capitalize">
                  {order.status}
                </Badge>
                <Button variant="outline" asChild>
                  <Link href={`/orders/${order.id}`}>View Order</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
