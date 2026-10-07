"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import {
  getLatestReviews,
  type ProductReview,
} from "@/lib/firebase/reviews";
import { fetchStoreProducts } from "@/lib/storefront-products";
import { getReviewCategoryLabel } from "@/lib/review-labels";

const fallbackReviews: Array<{
  id: string;
  name: string;
  rating: number;
  product: string;
  text: string;
  imageUrl?: string;
}> = [
  {
    id: "fallback-1",
    name: "Ayesha Khan",
    rating: 5,
    product: "Winter Collection",
    text: "Fabric quality bohot zabardast hai. Winter suit soft aur warm dono hai — cold weather ke liye perfect. Size chart bilkul accurate thi.",
  },
  {
    id: "fallback-2",
    name: "Fatima Ali",
    rating: 5,
    product: "Cotton",
    text: "Cotton elegant embroidery suit ka fit excellent hai. Ordering se delivery tak experience smooth raha. Definitely reorder karungi.",
  },
  {
    id: "fallback-3",
    name: "Zainab Ahmed",
    rating: 5,
    product: "Jeans / Trousers",
    text: "Jeans ka fit zabardast hai — soft aur stylish. Size chart follow kiya aur perfect fit mila.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

function toCardReview(
  review: ProductReview,
  categoryByProductId: Record<string, string>
) {
  const category =
    review.productCategory || categoryByProductId[review.productId];

  return {
    id: review.id,
    name: review.customerName,
    rating: review.rating,
    product: getReviewCategoryLabel(category, review.productName),
    text: review.comment,
    imageUrl: review.imageUrl,
  };
}

export function HomeReviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    async function loadReviews() {
      try {
        const [data, products] = await Promise.all([
          getLatestReviews(12),
          fetchStoreProducts(),
        ]);

        if (data.length === 0) return;

        const categoryByProductId = Object.fromEntries(
          products.map((product) => [product.id, product.category])
        );

        setReviews(data.map((review) => toCardReview(review, categoryByProductId)));
      } catch (error) {
        console.error("Failed to load homepage reviews:", error);
      }
    }

    loadReviews();
  }, []);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(360, el.clientWidth * 0.85);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    const autoplay = window.setInterval(() => {
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({
          left: Math.min(360, el.clientWidth * 0.85),
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      window.clearInterval(autoplay);
    };
  }, [reviews]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <section className="relative overflow-hidden border-y bg-muted/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Customer Love
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-muted-foreground">
              Real feedback from customers who shop Winter Collection, Cotton,
              Jeans and Fancy Wear with us.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={Math.round(averageRating) || 5} />
              <span>
                {reviews.length > 0
                  ? `${averageRating.toFixed(1)} average from ${reviews.length} review${reviews.length === 1 ? "" : "s"}`
                  : "Customer reviews"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              className="rounded-full border bg-background p-2.5 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              className="rounded-full border bg-background p-2.5 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group relative flex w-[85%] shrink-0 snap-start flex-col border border-border/80 bg-background p-6 transition-shadow hover:shadow-md sm:w-[340px]"
            >
              <Quote className="mb-4 size-7 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70" />
              <Stars rating={review.rating} />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{review.text}&rdquo;
              </p>

              {review.imageUrl && (
                <div className="relative mt-4 h-36 w-full overflow-hidden rounded-md bg-muted/30">
                  <Image
                    src={review.imageUrl}
                    alt={`Review by ${review.name}`}
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4">
                <div className="min-w-0">
                  <p className="font-medium">{review.name}</p>
                </div>
                <span className="max-w-[50%] truncate rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {review.product}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
