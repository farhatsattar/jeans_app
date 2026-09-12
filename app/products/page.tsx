"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductsFilter } from "@/components/products-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { Product, ProductColor } from "@/lib/products";
import { fetchStoreProducts } from "@/lib/storefront-products";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [color, setColor] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchStoreProducts();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const searchMatch = product.name.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = category === "all" || product.category === category;
      const colorMatch = color === "all" || product.colors.includes(color as ProductColor);
      const priceMatch = product.price <= maxPrice;
      return searchMatch && categoryMatch && colorMatch && priceMatch;
    });

    if (sort === "low-high") {
      return filtered.sort((a, b) => a.price - b.price);
    }
    if (sort === "high-low") {
      return filtered.sort((a, b) => b.price - a.price);
    }
    return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }, [category, color, maxPrice, products, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold">All Clothes</h1>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ProductsFilter
            query={query}
            category={category}
            color={color}
            maxPrice={maxPrice}
            sort={sort}
            onChange={(key, value) => {
              if (key === "query") setQuery(String(value));
              if (key === "category") setCategory(String(value));
              if (key === "color") setColor(String(value));
              if (key === "maxPrice") setMaxPrice(Number(value));
              if (key === "sort") setSort(String(value));
            }}
          />
        </aside>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-96 w-full" />
              ))
            : filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}
