"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ImagePlus, Loader2, Star, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/firebase/config";
import { onAuthChange } from "@/lib/firebase/auth";
import {
  createReview,
  getReviewsByProduct,
  type ProductReview,
} from "@/lib/firebase/reviews";
import { uploadImage } from "@/lib/firebase/storage";

function Stars({
  rating,
  interactive = false,
  onSelect,
}: {
  rating: number;
  interactive?: boolean;
  onSelect?: (value: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        const filled = value <= rating;

        if (!interactive) {
          return (
            <Star
              key={value}
              className={`size-4 ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          );
        }

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect?.(value)}
            className="rounded p-0.5 transition hover:scale-110"
            aria-label={`Rate ${value} stars`}
          >
            <Star
              className={`size-6 ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export function ProductReviews({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setIsLoggedIn(Boolean(user));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      try {
        const data = await getReviewsByProduct(productId);
        setReviews(data);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [productId]);

  const clearImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      toast.error("Please login to write a review.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    if (rating < 1) {
      toast.error("Please select a rating.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl: string | undefined;

      if (imageFile) {
        imageUrl = await uploadImage(
          imageFile,
          `reviews/${productId}/${user.uid}_${Date.now()}_${imageFile.name}`
        );
      }

      await createReview({
        productId,
        productName,
        customerId: user.uid,
        customerName:
          user.displayName?.trim() ||
          user.email?.split("@")[0] ||
          "Customer",
        customerEmail: user.email || "",
        rating,
        comment: comment.trim(),
        imageUrl,
      });

      const refreshed = await getReviewsByProduct(productId);
      setReviews(refreshed);
      setComment("");
      setRating(5);
      clearImage();
      toast.success("Review submitted. Thank you!");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-10 space-y-6 border p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {reviews.length > 0
              ? `${averageRating.toFixed(1)} average from ${reviews.length} review${reviews.length === 1 ? "" : "s"}`
              : "Be the first to review this product"}
          </p>
        </div>
        {reviews.length > 0 && <Stars rating={Math.round(averageRating)} />}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-muted/20 p-4">
        <div>
          <Label className="mb-2 block">Your rating</Label>
          <Stars rating={rating} interactive onSelect={setRating} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-comment">Your review</Label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            disabled={!isLoggedIn || submitting}
          />
        </div>

        <div className="space-y-2">
          <Label>Product photo (optional)</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) =>
              handleImageChange(event.target.files?.[0] ?? null)
            }
          />

          {imagePreview ? (
            <div className="relative h-28 w-28 overflow-hidden rounded-lg border">
              <Image
                src={imagePreview}
                alt="Review preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
                aria-label="Remove image"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              disabled={!isLoggedIn || submitting}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="mr-2 size-4" />
              Upload photo
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            JPG, PNG or WebP • Max 5 MB
          </p>
        </div>

        {isLoggedIn ? (
          <Button type="submit" disabled={submitting} className="bg-black text-white hover:bg-black/90">
            {submitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit review"
            )}
          </Button>
        ) : (
          <div className="rounded-lg border bg-background p-3 text-sm">
            <p className="text-muted-foreground">
              Please login to write a review and upload a photo.
            </p>
            <Link
              href="/login"
              className="mt-2 inline-block font-medium underline underline-offset-4"
            >
              Login to review
            </Link>
          </div>
        )}
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="space-y-3 border-t pt-4 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{review.customerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(review.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {review.comment}
              </p>
              {review.imageUrl && (
                <div className="relative h-40 w-40 overflow-hidden rounded-lg border bg-muted/30">
                  <Image
                    src={review.imageUrl}
                    alt={`Review by ${review.customerName}`}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
