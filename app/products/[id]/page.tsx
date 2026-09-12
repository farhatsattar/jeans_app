"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Loader2, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { fetchStoreProduct } from "@/lib/storefront-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShopStore } from "@/store/use-shop-store";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useShopStore((state) => state.addToCart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("M");

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchStoreProduct(params.id);
      setProduct(data);
      setSize(data?.sizes[0] ?? "M");
      setLoading(false);
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) return notFound();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            width={1100}
            height={1300}
            className="h-[520px] w-full rounded-xl object-cover"
          />
          <div className="grid grid-cols-2 gap-3">
            {product.images.map((image, index) => (
              <button key={image} onClick={() => setSelectedImage(index)} className="overflow-hidden rounded-lg border">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={420}
                  height={240}
                  className="h-28 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge>{product.category}</Badge>
            <h1 className="mt-3 text-3xl font-semibold">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <p className="text-2xl font-semibold">${product.price}</p>
              <p className="flex items-center gap-1 text-muted-foreground">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {product.rating} ({product.reviews} reviews)
              </p>
            </div>
            <p className="mt-4 text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-3">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((itemSize) => (
                <button
                  key={itemSize}
                  onClick={() => setSize(itemSize)}
                  className={`h-10 w-10 rounded-md border text-sm ${size === itemSize ? "border-blue-700 bg-blue-700 text-white" : ""}`}
                >
                  {itemSize}
                </button>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size,
              });
              toast.success("Added to cart");
            }}
          >
            Add to Cart
          </Button>

          <div className="space-y-3 rounded-xl border p-4">
            <h3 className="font-medium">Reviews</h3>
            <p className="text-sm text-muted-foreground">
              &ldquo;Excellent fit and fabric quality. Looks premium and feels comfortable.&rdquo;
            </p>
            <p className="text-sm text-muted-foreground">
              &ldquo;Great stretch and modern cut. Definitely buying another color.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
