"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShopStore } from "@/store/use-shop-store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useShopStore((state) => state.addToCart);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="overflow-hidden rounded-xl border bg-card">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || "/images/image.jpg"}
            alt={product.name}
            width={800}
            height={900}
            className="h-72 w-full object-contain"
          />
        </Link>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{product.name}</h3>
            <p className="font-semibold">Rs.{product.price.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{product.category}</span>
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              {product.rating}
            </span>
          </div>
          <div className="flex items-center justify-between">
            {product.isNew ? <Badge>New</Badge> : <span />}
            <Button
              size="sm"
              onClick={() => {
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                  size: product.sizes[0],
                });
                toast.success("Added to cart");
              }}
            >
              <ShoppingCart className="mr-2 size-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
