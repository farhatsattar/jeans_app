"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getCartCount,
  getCartTotal,
  useShopStore,
} from "@/store/use-shop-store";

export function CartDrawer() {
  const cart = useShopStore((state) => state.cart);
  const isCartOpen = useShopStore((state) => state.isCartOpen);
  const setCartOpen = useShopStore((state) => state.setCartOpen);
  const closeCart = useShopStore((state) => state.closeCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const updateQuantity = useShopStore((state) => state.updateQuantity);

  const total = getCartTotal(cart);
  const count = getCartCount(cart);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="flex h-dvh max-h-dvh w-full max-w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
      >
        <SheetHeader className="shrink-0 border-b px-4 py-4 pr-12">
          <SheetTitle className="text-lg font-semibold tracking-wide">
            Your cart
          </SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Your cart is empty"
              : `${count} item${count === 1 ? "" : "s"} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
            <p className="text-sm text-muted-foreground">
              Continue shopping to add premium Pakistani clothes.
            </p>
            <Button
              asChild
              className="rounded-none bg-black px-6 text-white hover:bg-black/90"
              onClick={closeCart}
            >
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-3 border-b pb-4 last:border-b-0"
                >
                  <Link
                    href={`/products/${item.productId}`}
                    onClick={closeCart}
                    className="relative h-24 w-20 shrink-0 overflow-hidden bg-muted/40"
                  >
                    <Image
                      src={item.image || "/images/image.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.productId}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Size: {item.size}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Rs.{item.price.toLocaleString()}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="px-2 py-1.5 hover:bg-muted"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="px-2 py-1.5 hover:bg-muted"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label="Remove item"
                        className="p-1 text-muted-foreground hover:text-red-500"
                        onClick={() =>
                          removeFromCart(item.productId, item.size)
                        }
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="mt-0 shrink-0 border-t bg-background px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="mb-1 flex items-start justify-between gap-3 text-sm">
                <span className="shrink-0 text-muted-foreground">
                  Estimated total
                </span>
                <span className="text-right text-base font-semibold leading-tight sm:text-lg">
                  Rs.{total.toLocaleString()}
                </span>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Delivery Rs.300 added at checkout.
              </p>

              <Button
                asChild
                className="h-11 w-full rounded-none bg-black text-white hover:bg-black/90"
                onClick={closeCart}
              >
                <Link href="/checkout">Check out</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 w-full rounded-none"
                onClick={closeCart}
              >
                <Link href="/cart">View cart</Link>
              </Button>

              <button
                type="button"
                onClick={closeCart}
                className="mt-1 pb-1 text-center text-sm underline underline-offset-4"
              >
                Continue shopping
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
