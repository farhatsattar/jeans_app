"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const isSoldOut =
    Boolean(product.isSoldOut) ||
    (typeof product.stock === "number" && product.stock <= 0);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <div className="group flex h-full flex-col rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-card">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl bg-muted/30">
            <Image
              src={product.images[0] || "/images/image.jpg"}
              alt={product.name}
              fill
              className={`object-contain object-center transition-transform duration-300 group-hover:scale-[1.02] ${
                isSoldOut ? "opacity-60" : ""
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {product.isNew && !isSoldOut && (
              <span className="absolute left-2 top-2 z-10 rounded-sm bg-[#800020] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                New
              </span>
            )}

            {isSoldOut && (
              <span className="absolute right-2 top-2 z-10 rounded-sm bg-black/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Sold Out
              </span>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="min-h-[3rem] text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground">{product.category}</p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            <p className="shrink-0 font-semibold text-foreground">
              Rs.{product.price.toLocaleString()}
            </p>
            {isSoldOut ? (
              <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase text-muted-foreground">
                Sold Out
              </span>
            ) : (
              <Button
                size="sm"
                asChild
                className="rounded-full bg-black text-white hover:bg-black/90"
              >
                <Link href={`/products/${product.id}`}>
                  <ShoppingCart className="mr-1.5 size-4" />
                  Add
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
