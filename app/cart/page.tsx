"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCartTotal, useShopStore } from "@/store/use-shop-store";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  const total = getCartTotal(cart);

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add premium Pakistani clothes to continue.</p>
        <Link href="/products">
          <Button className="mt-6">Go to Shop</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Cart</h1>
        {cart.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex gap-4 rounded-xl border p-4">
            <Image
              src={item.image}
              alt={item.name}
              width={240}
              height={280}
              className="h-28 w-24 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
              <p className="mt-1 font-semibold">Rs.{item.price.toLocaleString()}</p>
              <div className="mt-3 flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>
                  <Minus className="size-4" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.productId, item.size)}>
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="mt-4 flex items-center justify-between">
          <span>Total</span>
          <span className="text-2xl font-semibold">Rs.{total.toLocaleString()}</span>
        </div>
        <Link href="/checkout">
          <Button className="mt-6 w-full">Proceed to Checkout</Button>
        </Link>
      </aside>
    </section>
  );
}
