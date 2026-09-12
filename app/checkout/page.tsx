"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth } from "@/lib/firebase/config";
import { createOrder } from "@/lib/firebase/orders";

import {
  getCartTotal,
  useShopStore,
} from "@/store/use-shop-store";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore((state) => state.clearCart);

  const total = getCartTotal(cart);
  const shipping = total >= 5000 ? 0 : 200;
  const finalTotal = total + shipping;

  const [isPaying, setIsPaying] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("Please login before placing your order.");
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPaying(true);

    const formData = new FormData(event.currentTarget);

    const fullName = String(
      formData.get("name") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ??
        currentUser.email ??
        ""
    ).trim();

    const address = String(
      formData.get("address") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    if (!fullName) {
      toast.error("Please enter your full name.");
      setIsPaying(false);
      return;
    }

    if (!email) {
      toast.error("Please enter your email.");
      setIsPaying(false);
      return;
    }

    if (!address) {
      toast.error("Please enter your delivery address.");
      setIsPaying(false);
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number.");
      setIsPaying(false);
      return;
    }

    try {
      const orderId = await createOrder({
        customerId: currentUser.uid,

        customerName: fullName,

        customerEmail:
          email || currentUser.email || "",

        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,

          size: item.size as
            | "S"
            | "M"
            | "L"
            | "XL",

          color: "Blue",
        })),

        subtotal: total,

        shipping,

        total: finalTotal,

        status: "pending",

        shippingAddress: {
          fullName,
          address,
          city: "Pakistan",
          phone,
        },
      });

      // Clear cart
      clearCart();

      toast.success("Order placed successfully!");

      // IMPORTANT:
      // Order ID ke saath order details page par jayenge
      router.push(`/order-success/${orderId}`);
    } catch (error: unknown) {
      console.error(
        "Failed to place order:",
        error
      );

      if (error instanceof Error) {
        console.error(
          "Error message:",
          error.message
        );
      }

      toast.error(
        "Failed to place order. Please try again."
      );
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
      {/* CHECKOUT FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border p-6"
      >
        <div>
          <h1 className="text-3xl font-semibold">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter your delivery information.
          </p>
        </div>

        {/* NAME */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name
          </Label>

          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Ayesha Khan"
            required
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            defaultValue={
              auth?.currentUser?.email ?? ""
            }
            required
          />
        </div>

        {/* ADDRESS */}
        <div className="space-y-2">
          <Label htmlFor="address">
            Delivery Address
          </Label>

          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Street, area, city, postal code"
            required
          />
        </div>

        {/* PHONE */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number
          </Label>

          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+92 300 0000000"
            required
          />
        </div>

        {/* PAYMENT */}
        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="font-medium">
            Payment Method
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Stripe Payment: Mock integration enabled
            for demo.
          </p>
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full"
          disabled={
            isPaying ||
            cart.length === 0
          }
        >
          {isPaying
            ? "Processing Payment..."
            : "Place Order"}
        </Button>
      </form>

      {/* ORDER SUMMARY */}
      <aside className="h-fit rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Order Summary
        </h2>

        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-muted-foreground">
                  Size: {item.size}
                </p>

                <p className="text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>

              <span className="whitespace-nowrap font-medium">
                Rs.
                {(
                  item.price *
                  item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-6 space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal
              </span>

              <span>
                Rs.
                {total.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Shipping
              </span>

              <span>
                {shipping === 0
                  ? "Free"
                  : `Rs.${shipping.toLocaleString()}`}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-semibold">
              <span>Total</span>

              <span>
                Rs.
                {finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}