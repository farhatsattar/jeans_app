"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PRODUCT_CATEGORIES,
  normalizeProductCategory,
} from "@/lib/product-categories";
import { Product } from "@/lib/products";
import { fetchStoreProducts } from "@/lib/storefront-products";

const PER_SECTION = 4;

const categoryCopy: Partial<Record<(typeof PRODUCT_CATEGORIES)[number], string>> = {
  "Winter Collection": "Warm khaddar and winter-ready stitched looks.",
  "Cotton Elegant Embroidery Suit": "Everyday elegance in premium cotton embroidery.",
  "Jeans / Trousers": "Comfortable fits for daily wear.",
  "Fancy Wear": "Festive pieces for weddings and celebrations.",
  Unstitched: "Unstitched fabrics ready for your tailor.",
  Jewelry: "Finishing touches for every outfit.",
  "Coratia Designs": "Handmade crochet roses and delicate Coratia Designs pieces.",
  "Handbags / Purse": "Bags and purses for day to night.",
};

function pickCategoryProducts(products: Product[], category: string): Product[] {
  const inCategory = products.filter(
    (p) => normalizeProductCategory(p.category) === category
  );
  const featured = inCategory.filter((p) => p.isFeatured);
  const rest = inCategory.filter((p) => !p.isFeatured);
  return [...featured, ...rest].slice(0, PER_SECTION);
}

export function CategoryProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchStoreProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load category products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sections = useMemo(
    () =>
      PRODUCT_CATEGORIES.map((category) => ({
        category,
        items: pickCategoryProducts(products, category),
        total: products.filter(
          (p) => normalizeProductCategory(p.category) === category
        ).length,
      })).filter((section) => section.items.length > 0),
    [products]
  );

  if (loading) {
    return (
      <div className="space-y-16">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-6">
            <Skeleton className="mx-auto h-8 w-48" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, card) => (
                <Skeleton key={card} className="h-[380px] w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="text-muted-foreground">
          No products available right now. Add products from the admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {sections.map((section, sectionIndex) => (
        <motion.section
          key={section.category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.35,
            ease: [0.23, 1, 0.32, 1],
            delay: Math.min(sectionIndex * 0.04, 0.12),
          }}
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Collection
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {section.category}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {categoryCopy[section.category] ??
                  `Shop the latest from ${section.category}.`}
              </p>
            </div>

            <Link
              href={`/products?category=${encodeURIComponent(section.category)}`}
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium underline-offset-4 transition-colors duration-200 ease-out hover:underline active:scale-[0.97]"
            >
              View all
              {section.total > section.items.length
                ? ` (${section.total})`
                : ""}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Mobile: snap row; Desktop: grid */}
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {section.items.map((product) => (
              <div
                key={product.id}
                className="h-full w-[78%] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
