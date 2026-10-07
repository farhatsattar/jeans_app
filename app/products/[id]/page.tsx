"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2, Minus, Plus } from "lucide-react";
import { Product, ProductSize } from "@/lib/products";
import { fetchStoreProduct, fetchStoreProducts } from "@/lib/storefront-products";
import { Button } from "@/components/ui/button";
import { SizeChart } from "@/components/size-chart";
import { ProductCard } from "@/components/product-card";
import { ProductReviews } from "@/components/product-reviews";
import { useShopStore } from "@/store/use-shop-store";

const APPAREL_SIZES: ProductSize[] = ["S", "M", "L", "XL"];

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useShopStore((state) => state.addToCart);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setSelectedImage(0);
      setQuantity(1);

      const [data, allProducts] = await Promise.all([
        fetchStoreProduct(params.id),
        fetchStoreProducts(),
      ]);

      setProduct(data);
      const defaultSize =
        data?.sizes.includes("M")
          ? "M"
          : data?.sizes[0] ?? "M";
      setSize(defaultSize);

      if (data) {
        const relatedProducts = allProducts
          .filter((item) => item.id !== data.id && item.category === data.category)
          .slice(0, 4);

        const fallbackRelated =
          relatedProducts.length > 0
            ? relatedProducts
            : allProducts.filter((item) => item.id !== data.id).slice(0, 4);

        setRelated(fallbackRelated);
      }

      setLoading(false);
    }

    loadProduct();
  }, [params.id]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    // Keep unique images; if only one exists, still show a clean single gallery
    return Array.from(new Set(product.images.filter(Boolean)));
  }, [product]);

  const availableSizes = useMemo(() => {
    if (!product) return APPAREL_SIZES;

    const isAccessory =
      product.category === "Jewelry" ||
      product.category === "Handbags / Purse";

    if (isAccessory) {
      return product.sizes.length > 0 ? product.sizes : (["One Size"] as ProductSize[]);
    }

    // Always show S, M, L, XL boxes for clothing products
    return APPAREL_SIZES;
  }, [product]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) return notFound();

  const prevImage = () => {
    setSelectedImage((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        quantity,
      },
      { openDrawer: true }
    );
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Ambreen-style media gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted/40">
              <Image
                src={galleryImages[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm transition hover:bg-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm transition hover:bg-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden border bg-muted/30 transition ${
                      selectedImage === index
                        ? "border-black ring-1 ring-black"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Haa-Meem
            </p>
            <h1 className="mt-2 text-2xl font-semibold leading-snug md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <p className="text-2xl font-semibold">
                Rs.{product.price.toLocaleString()} PKR
              </p>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Free shipping
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8 space-y-3">
              <p className="text-sm font-medium">
                Size: <span className="font-normal text-muted-foreground">{size}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((itemSize) => (
                  <button
                    key={itemSize}
                    type="button"
                    onClick={() => setSize(itemSize)}
                    className={`min-w-14 border px-4 py-2.5 text-sm font-medium transition ${
                      size === itemSize
                        ? "border-black bg-black text-white"
                        : "border-border bg-background hover:border-black"
                    }`}
                  >
                    {itemSize}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium">Quantity</p>
              <div className="inline-flex items-center border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-muted"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2.5 hover:bg-muted"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-8 w-full rounded-none bg-black py-6 text-white hover:bg-black/90"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>

            {product.category !== "Jewelry" &&
              product.category !== "Handbags / Purse" && (
                <div className="mt-8">
                  <SizeChart selectedSize={size} />
                </div>
              )}

            <ProductReviews
              productId={product.id}
              productName={product.name}
              productCategory={product.category}
            />
          </div>
        </div>
      </section>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="border-t bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  You may also like
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  More from our {product.category} collection
                </p>
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
