"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, Package, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getOrder } from "@/lib/firebase/orders";
import { auth } from "@/lib/firebase/config";

import type { Order } from "@/types/admin";

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          router.push("/login");
          return;
        }

        const data = await getOrder(orderId);

        if (!data) {
          setError("Order not found.");
          return;
        }

        // Security check on client side as an additional protection
        if (
          data.customerId !== currentUser.uid
        ) {
          setError(
            "You are not allowed to view this order."
          );
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error(
          "Failed to load order:",
          err
        );

        setError(
          "Unable to load order details."
        );
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      loadOrder();
    }
  }, [orderId, router]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-xl border p-8 text-center">
          <p className="text-muted-foreground">
            Loading order details...
          </p>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-2xl font-semibold">
            Order Not Found
          </h1>

          <p className="mt-2 text-muted-foreground">
            {error || "This order could not be found."}
          </p>

          <Button
            className="mt-6"
            asChild
          >
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  const orderDate = new Date(
    order.createdAt
  ).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* SUCCESS HEADER */}
      <div className="rounded-xl border p-6 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

        <h1 className="mt-4 text-3xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-2 text-muted-foreground">
          Thank you for shopping with ClothHub.
        </p>

        <div className="mx-auto mt-5 max-w-md rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            Order ID
          </p>

          <p className="mt-1 break-all font-mono text-sm font-semibold">
            {order.id}
          </p>
        </div>
      </div>

      {/* ORDER STATUS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-5 text-center">
          <CheckCircle2 className="mx-auto h-7 w-7" />

          <p className="mt-2 font-medium">
            Order Placed
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Your order has been received.
          </p>
        </div>

        <div className="rounded-xl border p-5 text-center">
          <Package className="mx-auto h-7 w-7" />

          <p className="mt-2 font-medium">
            Processing
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Current status:{" "}
            <span className="font-medium capitalize">
              {order.status}
            </span>
          </p>
        </div>

        <div className="rounded-xl border p-5 text-center">
          <Truck className="mx-auto h-7 w-7" />

          <p className="mt-2 font-medium">
            Delivery
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            We will deliver your order soon.
          </p>
        </div>
      </div>

      {/* CUSTOMER INFORMATION */}
      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Customer Information
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Full Name
            </p>

            <p className="mt-1 font-medium">
              {order.customerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="mt-1 font-medium">
              {order.customerEmail}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Phone
            </p>

            <p className="mt-1 font-medium">
              {order.shippingAddress.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Order Date
            </p>

            <p className="mt-1 font-medium">
              {orderDate}
            </p>
          </div>
        </div>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Delivery Address
        </h2>

        <div className="mt-4 rounded-lg bg-muted/40 p-4">
          <p className="font-medium">
            {order.shippingAddress.fullName}
          </p>

          <p className="mt-1 text-muted-foreground">
            {order.shippingAddress.address}
          </p>

          <p className="mt-1 text-muted-foreground">
            {order.shippingAddress.city}
          </p>

          <p className="mt-1 text-muted-foreground">
            {order.shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Order Items
        </h2>

        <div className="mt-5 space-y-5">
          {order.items.map((item, index) => (
            <div
              key={`${item.productId}-${item.size}-${index}`}
              className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
            >
              {/* IMAGE */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="min-w-0 flex-1">
                <h3 className="font-medium">
                  {item.name}
                </h3>

                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <p>
                    Size: {item.size}
                  </p>

                  <p>
                    Color: {item.color}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              {/* PRICE */}
              <div className="text-right">
                <p className="font-medium">
                  Rs.
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Rs.
                  {item.price.toLocaleString()} each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENT / TOTAL */}
      <div className="mt-6 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Order Summary
        </h2>

        <div className="mt-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal
            </span>

            <span>
              Rs.
              {order.subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Shipping
            </span>

            <span>
              {order.shipping === 0
                ? "Free"
                : `Rs.${order.shipping.toLocaleString()}`}
            </span>
          </div>

          <div className="flex justify-between border-t pt-4 text-xl font-bold">
            <span>Total</span>

            <span>
              Rs.
              {order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          className="flex-1"
          asChild
        >
          <Link href="/">
            Continue Shopping
          </Link>
        </Button>

        <Button
          variant="outline"
          className="flex-1"
          asChild
        >
          <Link href="/orders">
            View My Orders
          </Link>
        </Button>
      </div>
    </section>
  );
}