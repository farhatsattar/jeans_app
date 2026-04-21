"use client";

import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCartCount, useShopStore } from "@/store/use-shop-store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" },
];

export function Navbar() {
  const cart = useShopStore((state) => state.cart);
  const cartCount = getCartCount(cart);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Denim<span className="text-blue-700">Co</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 px-1.5 py-0 text-[10px]">{cartCount}</Badge>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger className="md:hidden" render={<Button variant="ghost" size="icon" aria-label="Menu" />}>
                <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-10 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg">
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
