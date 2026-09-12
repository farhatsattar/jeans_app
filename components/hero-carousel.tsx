
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

export function HeroCarousel({ slides, intervalMs = 5000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] min-h-115 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            width={1600}
            height={1100}
            priority={index === 0}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col items-center justify-center text-center text-white">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`transition-all duration-700 ${
                index === active ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={index !== active}
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">
                {slide.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight drop-shadow-lg md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-4 text-base text-white/90 drop-shadow md:text-lg">
                {slide.description}
              </p>
              <Link href="/products" className="inline-block">
                <Button size="lg" className="mt-8 shadow-lg">
                  Shop Collection <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === active ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
