"use client";

import Link from "next/link";

export function MoreCollectionsButton() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[55] flex justify-center px-4 sm:bottom-6">
      <Link
        href="/products"
        aria-label="More collections"
        className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-[#CC5500] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#A84600]"
      >
        More Collections
      </Link>
    </div>
  );
}
