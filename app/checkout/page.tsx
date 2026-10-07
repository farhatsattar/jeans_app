"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { auth } from "@/lib/firebase/config";
import { createOrder } from "@/lib/firebase/orders";

import {
  getCartCount,
  getCartTotal,
  useShopStore,
} from "@/store/use-shop-store";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore((state) => state.clearCart);

  const total = getCartTotal(cart);
  const count = getCartCount(cart);
  const shipping = 0;
  const finalTotal = total;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = auth.currentUser;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("name") ?? "").trim();
    const email = String(
      formData.get("email") ?? currentUser?.email ?? ""
    ).trim();
    const city = String(formData.get("city") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!fullName) {
      toast.error("Please enter your full name.");
      setIsSubmitting(false);
      return;
    }

    if (!email) {
      toast.error("Please enter your email.");
      setIsSubmitting(false);
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number.");
      setIsSubmitting(false);
      return;
    }

    if (!city) {
      toast.error("Please enter your city.");
      setIsSubmitting(false);
      return;
    }

    if (!address) {
      toast.error("Please enter your delivery address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const guestId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? `guest-${crypto.randomUUID()}`
          : `guest-${Date.now()}`;

      const orderId = await createOrder({
        customerId: currentUser?.uid || guestId,
        customerName: fullName,
        customerEmail: email,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size as "S" | "M" | "L" | "XL" | "One Size",
          color: "Blue",
        })),
        subtotal: total,
        shipping,
        total: finalTotal,
        status: "pending",
        shippingAddress: {
          fullName,
          address: notes ? `${address}\nNote: ${notes}` : address,
          city,
          phone,
        },
      });

      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order-success/${orderId}`);
    } catch (error: unknown) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Add products before checking out.
        </p>
        <Button asChild className="mt-6 rounded-none bg-black text-white hover:bg-black/90">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6 border p-5 sm:p-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Guest checkout available — login not required.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
            Contact
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ayesha Khan"
                defaultValue={currentUser?.displayName ?? ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                defaultValue={currentUser?.email ?? ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0300 0000000"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
            Delivery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="Karachi"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="House / street / area"
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Order note (optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Any special delivery instructions..."
              />
            </div>
          </div>
        </div>

        <div className="rounded-none border bg-muted/30 p-4">
          <p className="font-medium">Payment Method</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Cash on Delivery (COD) — pay when your order arrives.
          </p>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-none bg-black text-base text-white hover:bg-black/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </Button>
      </form>

      <aside className="h-fit border p-5 sm:p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {count} item{count === 1 ? "" : "s"}
        </p>

        <div className="mt-5 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-3 border-b pb-4 last:border-b-0"
            >
              <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted/40">
                <Image
                  src={item.image || "/images/image.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">Size: {item.size}</p>
              </div>
              <p className="shrink-0 text-sm font-medium">
                Rs.{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>Rs.{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between border-t pt-3 text-lg font-semibold">
            <span>Total</span>
            <span>Rs.{finalTotal.toLocaleString()} PKR</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
