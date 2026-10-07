"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCartCount,
  getCartTotal,
  useShopStore,
} from "@/store/use-shop-store";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  const total = getCartTotal(cart);
  const count = getCartCount(cart);

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Add premium Pakistani clothes to continue.
        </p>
        <Button asChild className="mt-6 rounded-none bg-black text-white hover:bg-black/90">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold">Your cart</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {count} item{count === 1 ? "" : "s"}
          </p>
        </div>

        {cart.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex gap-4 border p-4"
          >
            <Link
              href={`/products/${item.productId}`}
              className="relative h-28 w-24 shrink-0 overflow-hidden bg-muted/40"
            >
              <Image
                src={item.image || "/images/image.jpg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${item.productId}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
              <p className="mt-1 font-semibold">
                Rs.{item.price.toLocaleString()} PKR
              </p>

              <div className="mt-3 inline-flex items-center border">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-none"
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity - 1)
                  }
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-none"
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity + 1)
                  }
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.productId, item.size)}
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <aside className="h-fit border p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>Rs.{total.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3 text-lg font-semibold">
            <span>Total</span>
            <span>Rs.{total.toLocaleString()} PKR</span>
          </div>
        </div>

        <Button
          asChild
          className="mt-6 h-11 w-full rounded-none bg-black text-white hover:bg-black/90"
        >
          <Link href="/checkout">Check out</Link>
        </Button>
        <Button asChild variant="outline" className="mt-2 h-11 w-full rounded-none">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </aside>
    </section>
  );
}
