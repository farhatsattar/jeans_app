import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { FeaturedProducts } from "@/components/featured-products";

const categories = [
  { name: "Shalwar Kameez", image: "/images/images.jfif" },
  { name: "Kurta", image: "/images/kurta.jfif" },
  { name: "Dupatta", image: "/images/images3.jfif" },
  { name: "Trouser", image: "/images/tr2.jfif" },
];

const heroSlides: HeroSlide[] = [
  {
    image: "/images/images3.jfif",
    eyebrow: "Summer 2026 Collection",
    title: "Premium Stitched Clothes",
    description: "Discover premium Pakistani stitched Shalwar Kameez, Kurta, Dupatta and more.",
  },
  {
    image: "/images/images%20(5).jfif",
    eyebrow: "Eid Edit",
    title: "Festive Embroidered Picks",
    description: "Hand-embroidered suits and dupattas perfect for Eid and family gatherings.",
  },
  {
    image: "/images/images%20(6).jfif",
    eyebrow: "Lawn Collection",
    title: "Lightweight Lawn Fabrics",
    description: "Breathable lawn dresses designed for the Pakistani summer.",
  },
];

export default function Home() {
  return (
    <div>
      <HeroCarousel slides={heroSlides} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <FeaturedProducts />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-semibold">Shop by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name}`}
              className="rounded-xl border bg-muted/30 overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <span className="text-lg font-medium text-foreground capitalize">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-blue-950 px-6 py-12 text-white md:px-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Limited Time</p>
          <h2 className="mt-3 text-3xl font-semibold">Up to 30% Off This Season</h2>
          <p className="mt-3 text-white/80">Apply code PAKISTANI30 at checkout for selected styles.</p>
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
