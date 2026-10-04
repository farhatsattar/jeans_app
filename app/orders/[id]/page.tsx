"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/firebase/config";
import { getOrder } from "@/lib/firebase/orders";
import type { Order } from "@/types/admin";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const data = await getOrder(params.id);

        if (!data) {
          setError("Order not found.");
          return;
        }

        if (data.customerId !== user.uid) {
          setError("You are not allowed to view this order.");
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error("Failed to load order:", err);
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Order Not Found</h1>
        <p className="mt-2 text-muted-foreground">{error || "This order could not be found."}</p>
        <Button className="mt-6" asChild>
          <Link href="/orders">Back to My Orders</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            Order #{order.id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleString("en-PK", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-xl border p-4">
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge variant="secondary" className="mt-1 capitalize">
            {order.status}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="mt-1 text-xl font-semibold">
            Rs.{order.total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Items</h2>
          <div className="mt-4 space-y-4">
            {order.items.map((item, index) => (
              <div
                key={`${item.productId}-${item.size}-${index}`}
                className="flex gap-4 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="relative size-20 overflow-hidden rounded-lg border bg-muted">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Size: {item.size} • Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  Rs.{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Delivery Address</h2>
          <div className="mt-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {order.shippingAddress.fullName}
            </p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>Rs.{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {order.shipping === 0
                  ? "Free"
                  : `Rs.${order.shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>Rs.{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/orders">All Orders</Link>
        </Button>
      </div>
    </section>
  );
}
