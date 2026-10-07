"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Search, User } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCartCount, useShopStore } from "@/store/use-shop-store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/products?category=Winter Collection", label: "Winter Collection" },
  { href: "/products?category=Cotton Elegant Embroidery Suit", label: "Cotton Elegant Embroidery Suit" },
  { href: "/products?category=Jeans / Trousers", label: "Jeans / Trousers" },
  { href: "/products?category=Fancy Wear", label: "Fancy Wear" },
  { href: "/products?category=Jewelry", label: "Jewelry" },
  { href: "/products?category=Handbags / Purse", label: "Handbags / Purse" },
  { href: "/orders", label: "My Orders" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=100063791665269",
    label: "Facebook",
    className: "text-blue-500 hover:text-white",
    icon: (
      <svg
        className="size-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/haameem.pk/",
    label: "Instagram",
    className: "text-pink-400 hover:text-white",
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          width="20"
          height="20"
          x="2"
          y="2"
          rx="5"
          ry="5"
          strokeWidth="2"
        />
        <path
          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          strokeWidth="2"
        />
        <line
          x1="17.5"
          x2="17.51"
          y1="6.5"
          y2="6.5"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@haa_meem",
    label: "TikTok",
    className: "text-white hover:text-pink-400",
    icon: (
      <svg
        className="size-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-4.197-4.69V1h-3.286v13.12a2.896 2.896 0 1 1-2.896-2.896c.3 0 .59.046.862.131V7.997a6.18 6.18 0 1 0 5.32 6.123V7.44a8.04 8.04 0 0 0 4.197 1.178V5.332a4.824 4.824 0 0 1-1-.646z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@haameem-xb6ro",
    label: "YouTube",
    className: "text-red-400 hover:text-white",
    icon: (
      <svg
        className="size-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.166 3.166 0 0 0-.255-1.349C22.64 3.516 18.91 2.5 12 2.5c-6.886 0-10.642 1.021-11.243 2.337a3.17 3.17 0 0 0-.255 1.349C.49 7.514-.01 11.23-.01 12s.5 4.486 1.492 5.814a3.17 3.17 0 0 0 .255 1.349C5.114 20.484 8.871 21.5 12 21.5c6.886 0 10.642-1.021 11.243-2.337a3.166 3.166 0 0 0 .255-1.349C23.51 16.486 24 12.77 24 12s-.5-4.486-1.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

function SocialIcons() {
  return (
    <div className="flex shrink-0 items-center gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors ${social.className}`}
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const cart = useShopStore((state) => state.cart);
  const cartCount = getCartCount(cart);

  const shippingMessage =
    "Free shipping Nationwide • Nationwide: Ready-to-Wear and Unstitched Orders: 5 working days";

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="sticky top-0 z-40 overflow-hidden bg-black py-2 text-xs tracking-wide text-white md:text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex w-max items-center gap-8 whitespace-nowrap animate-marquee">
            {/* Unit 1 */}
            <p className="font-medium">{shippingMessage}</p>
            <SocialIcons />

            {/* Unit 2 */}
            <p className="font-medium">{shippingMessage}</p>
            <SocialIcons />

            {/* Unit 3 */}
            <p className="font-medium">{shippingMessage}</p>
            <SocialIcons />

            {/* Unit 4 */}
            <p className="font-medium">{shippingMessage}</p>
            <SocialIcons />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-white dark:bg-card">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6 lg:px-8">

          {/* Left Side */}
          <div className="flex items-center justify-start gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              aria-label="Search"
            >
              <Search className="size-5" />
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
              onClick={() => useShopStore.getState().openCart()}
            >
              <ShoppingBag className="size-5" />

              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Centered Logo */}
          <Link
            href="/"
            className="whitespace-nowrap text-center text-lg font-bold tracking-wider text-foreground sm:text-xl md:text-2xl"
          >
            Haa-Meem
          </Link>

          {/* Right Side */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Login"
              >
                <User className="size-5" />
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Menu"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

