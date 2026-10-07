"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const user = auth?.currentUser ?? null;
    setCurrentUser(user);

    if (user) {
      setFullName((prev) => prev || user.displayName?.trim() || "");
      setEmail((prev) => prev || user.email || "");
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    const user = auth?.currentUser ?? currentUser;
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedCity = city.trim();
    const trimmedAddress = address.trim();
    const trimmedPhone = phone.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedName) {
      toast.error("Please enter your full name.");
      setIsSubmitting(false);
      return;
    }

    if (!trimmedEmail) {
      toast.error("Please enter your email.");
      setIsSubmitting(false);
      return;
    }

    if (!trimmedPhone) {
      toast.error("Please enter your phone number.");
      setIsSubmitting(false);
      return;
    }

    if (!trimmedCity) {
      toast.error("Please enter your city.");
      setIsSubmitting(false);
      return;
    }

    if (!trimmedAddress) {
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
        customerId: user?.uid || guestId,
        customerName: trimmedName,
        customerEmail: trimmedEmail,
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
          fullName: trimmedName,
          address: trimmedNotes
            ? `${trimmedAddress}\nNote: ${trimmedNotes}`
            : trimmedAddress,
          city: trimmedCity,
          phone: trimmedPhone,
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
                value={fullName ?? ""}
                onValueChange={setFullName}
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
                value={email ?? ""}
                onValueChange={setEmail}
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
                value={phone ?? ""}
                onValueChange={setPhone}
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
                value={city ?? ""}
                onValueChange={setCity}
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
                value={address ?? ""}
                onValueChange={setAddress}
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
                value={notes ?? ""}
                onChange={(event) => setNotes(event.target.value)}
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
