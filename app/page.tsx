import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

const categories = ["Men", "Women", "Skinny", "Baggy"];

export default function Home() {
  const featured = products.filter((product) => product.isFeatured);

  return (
    <div>
      <section className="relative h-[70vh] min-h-[460px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80"
          alt="Denim collection banner"
          width={1600}
          height={1100}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-[0.2em]">New Spring Denim</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Crafted Jeans. Minimal Style.
            </h1>
            <p className="mt-4 text-white/80">
              Discover clean silhouettes and premium fits inspired by urban denim culture.
            </p>
            <Link href="/products">
              <Button className="mt-8">
                Shop Collection <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-semibold">Shop by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="rounded-xl border bg-muted/30 p-6 text-center text-lg font-medium transition hover:bg-muted"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-blue-950 px-6 py-12 text-white md:px-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Limited Time</p>
          <h2 className="mt-3 text-3xl font-semibold">Up to 30% Off Denim Essentials</h2>
          <p className="mt-3 text-white/80">Apply code DENIM30 at checkout for selected styles.</p>
          <Link href="/products">
            <Button variant="secondary" className="mt-6">
              Grab the Deal
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl border p-8 text-center">
          <h2 className="text-2xl font-semibold">Join Our Newsletter</h2>
          <p className="mt-2 text-muted-foreground">Get product drops, styling tips, and exclusive offers.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
