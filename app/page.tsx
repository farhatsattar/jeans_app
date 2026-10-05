import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { FeaturedProducts } from "@/components/featured-products";
import { HomeReviews } from "@/components/home-reviews";
import { MoreCollectionsButton } from "@/components/more-collections-button";

const categories = [
  { name: "Winter Collection", image: "/images/images.jfif" },
  { name: "Cotton Elegant Embroidery Suit", image: "/images/kurta.jfif" },
  { name: "Jeans / Trousers", image: "/images/tr1.jfif" },
  { name: "Fancy Wear", image: "/images/images%20(2).jfif" },
  { name: "Jewelry", image: "/images/jewelry-pearl-set.jpg" },
  { name: "Handbags / Purse", image: "/images/handbag-black.jpg" },
];

const heroSlides: HeroSlide[] = [
  {
    video: "/images/modeling video.mp4",
    eyebrow: "Cotton Elegant Embroidery Suit",
    title: "Cotton Elegant Embroidery Suit",
    description: "Premium Pakistani cotton elegant embroidery suits with intricate detailing. Perfect for Eid and everyday style.",
  },
  {
    image: "/images/images3.jfif",
    eyebrow: "Eid Edit",
    title: "Festive Embroidered Picks",
    description: "Hand-embroidered suits and dupattas perfect for Eid and family gatherings.",
  },
  {
    video: "/images/khadarvideo.mp4",
    eyebrow: "Winter Edit",
    title: "Khaddar Collection",
    description: "Premium khaddar stitched suits crafted for warmth, comfort, and timeless winter style.",
  },
];

export default function Home() {
  return (
    <div>
      <MoreCollectionsButton />
      <HeroCarousel slides={heroSlides} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Featured Products</h2>
          <p className="mt-3 text-muted-foreground">Discover our latest collection of premium Pakistani clothes</p>
        </div>
        <FeaturedProducts />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-semibold text-center">Shop by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name}`}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg font-medium text-white drop-shadow-lg">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <HomeReviews />

      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-800 px-6 py-12 text-white md:px-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Limited Time</p>
            <h2 className="mt-3 text-3xl font-semibold">Up to 30% Off This Season</h2>
            <p className="mt-3 text-white/80">Apply code PAKISTANI30 at checkout for selected styles.</p>
            <Link href="/products">
              <Button variant="secondary" className="mt-6 bg-white text-black hover:bg-white/90">
                Grab the Deal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}