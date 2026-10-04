"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroSlide {
  image?: string;
  video?: string;
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

  const current = slides[active];

  return (
    <section className="relative h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.video ?? slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== active}
        >
          {slide.video ? (
            <video
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={slide.image ?? ""}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Single stable text layer — no stacking / jumping */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center text-white">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/90">
            {current.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            {current.description}
          </p>
          <Link href="/products" className="mt-8 inline-block">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 py-6 text-base font-medium text-black shadow-lg hover:bg-white/90"
            >
              Shop Collection <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(active - 1)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(active + 1)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/60"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.video ?? slide.image}
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
