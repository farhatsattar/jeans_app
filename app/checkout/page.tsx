"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCartTotal, useShopStore } from "@/store/use-shop-store";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore((state) => state.clearCart);
  const total = getCartTotal(cart);
  const [isPaying, setIsPaying] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPaying(true);

    // Mock Stripe payment call.
    setTimeout(() => {
      clearCart();
      setIsPaying(false);
      toast.success("Payment successful. Order confirmed!");
      router.push("/");
    }, 1500);
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border p-6">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Street, city, postal code" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+1 555 100 200" required />
        </div>
        <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          Stripe Payment: Mock integration enabled for demo.
        </div>
        <Button type="submit" className="w-full" disabled={isPaying || cart.length === 0}>
          {isPaying ? "Processing Payment..." : "Pay Now"}
        </Button>
      </form>

      <aside className="h-fit rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="mt-4 space-y-3">
          {cart.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between text-sm">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t pt-3 font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
