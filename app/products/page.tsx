"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductsFilter } from "@/components/products-filter";
import { ProductColor, products } from "@/lib/products";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [color, setColor] = useState("all");
  const [maxPrice, setMaxPrice] = useState(120);
  const [sort, setSort] = useState("newest");

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
  }, [category, color, maxPrice, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold">All Jeans</h1>
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
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
