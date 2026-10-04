import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Scissors, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | Haa-Meem",
  description:
    "Haa-Meem has been crafting premium Pakistani fashion since 2020 — Winter Collection, Cotton Elegant Embroidery Suit, Jeans / Trousers, Fancy Wear, Jewelry and Handbags.",
};

const values = [
  {
    icon: Scissors,
    title: "Quality Stitching",
    description: "Every piece is carefully stitched for comfort, durability, and a refined finish.",
  },
  {
    icon: Sparkles,
    title: "Elegant Designs",
    description: "From cotton elegant embroidery suits and jeans to festive fancy wear, our collections balance tradition and modern style.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    description: "We choose fabrics and details that feel premium and make you feel confident.",
  },
  {
    icon: Users,
    title: "Trusted Since 2020",
    description: "Haa-Meem has been serving customers across Pakistan with reliable quality since 2020.",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Haa-Meem Begins",
    description: "Started with a vision to offer elegant Pakistani stitched clothes for everyday and special occasions.",
  },
  {
    year: "2022",
    title: "Growing Collection",
    description: "Expanded into Cotton Elegant Embroidery Suit and festive styles loved by customers for fit and fabric quality.",
  },
  {
    year: "2024",
    title: "Wider Reach",
    description: "Built a stronger online presence so women across Pakistan can shop with ease.",
  },
  {
    year: "Today",
    title: "Winter to Fancy Wear",
    description: "Now offering Winter Collection, Cotton Elegant Embroidery Suit, Jeans / Trousers, and Fancy Wear — all under one trusted brand.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] max-h-[560px] overflow-hidden">
        <Image
          src="/images/images3.jfif"
          alt="Haa-Meem clothing collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white">
              <p className="text-sm uppercase tracking-[0.25em] text-white/80">
                Since 2020
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Haa-Meem
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/85">
                Crafting premium Pakistani stitched clothing with elegance, comfort,
                and timeless detail — proudly serving since 2020.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Our Story
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Built with passion since 2020
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Haa-Meem started in <span className="font-medium text-foreground">2020</span> with a
                simple belief: every woman deserves beautifully stitched clothes that feel as good
                as they look.
              </p>
              <p>
                From warm winter suits to cotton embroidery suits, jeans, and fancy wear, we focus on
                quality fabric, clean stitching, and designs that suit Pakistani lifestyles —
                whether for daily wear, Eid, or celebrations.
              </p>
              <p>
                Over the years, Haa-Meem has grown into a trusted name for customers who value
                style, comfort, and reliable craftsmanship.
              </p>
            </div>
            <Link href="/products">
              <Button className="mt-8">
                Explore Collection <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/images.jfif"
              alt="Haa-Meem stitched outfits"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">What We Stand For</h2>
            <p className="mt-3 text-muted-foreground">
              The values that shape every Haa-Meem piece.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="border bg-background p-6">
                  <Icon className="size-6 text-foreground" />
                  <h3 className="mt-4 font-medium">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Our Journey</h2>
          <p className="mt-3 text-muted-foreground">
            From a 2020 beginning to a growing clothing brand.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item) => (
            <div key={item.year} className="border-l-2 border-foreground/20 pl-5">
              <p className="text-sm font-semibold tracking-wide text-foreground">
                {item.year}
              </p>
              <h3 className="mt-2 font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            Shop the Haa-Meem Collection
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Discover clothes, jewelry and handbags — crafted with care since 2020.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button variant="secondary" className="bg-white text-black hover:bg-white/90">
                Shop Now
              </Button>
            </Link>
            <Link href="/products?category=Winter Collection">
              <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                View Winter Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
