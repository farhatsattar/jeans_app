import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MoreCollectionsButton() {
  return (
    <Link
      href="/products"
      aria-label="Click for more collections"
      className="fixed bottom-5 left-5 z-[60] inline-flex max-w-[min(100vw-2.5rem,16rem)] items-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-black/90 sm:max-w-none sm:px-5"
    >
      <span>Click for more collections</span>
      <ArrowRight className="size-4 shrink-0" />
    </Link>
  );
}
