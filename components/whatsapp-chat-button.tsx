"use client";

import { useCallback } from "react";

/** Hardcoded digits only — do not use + or spaces (mobile WhatsApp rejects them). */
const WHATSAPP_PHONE = "923014440787";
const DEFAULT_MESSAGE =
  "Hi, I would like to know more about Haa-Meem Pakistani clothes.";

function PakistanFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="40" fill="#01411C" />
      <rect width="15" height="40" fill="#FFFFFF" />
      <circle cx="34" cy="20" r="8" fill="#FFFFFF" />
      <circle cx="36.5" cy="20" r="7" fill="#01411C" />
      <polygon
        points="41,14 42.2,17.2 45.5,17.2 42.8,19.2 43.8,22.4 41,20.4 38.2,22.4 39.2,19.2 36.5,17.2 39.8,17.2"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function getLinks() {
  const text = encodeURIComponent(DEFAULT_MESSAGE);
  const waMe = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  const api = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;
  // Android: open WhatsApp app directly
  const androidIntent =
    `intent://send/?phone=${WHATSAPP_PHONE}&text=${text}` +
    `#Intent;scheme=whatsapp;package=com.whatsapp;` +
    `S.browser_fallback_url=${encodeURIComponent(waMe)};end`;

  return { waMe, api, androidIntent };
}

export function WhatsAppChatButton() {
  const { waMe, api, androidIntent } = getLinks();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isAndroid = /Android/i.test(ua);
      const isIOS = /iPhone|iPad|iPod/i.test(ua);

      // Mobile: force full navigation (in-app browsers / SPA can break target=_blank)
      if (isAndroid) {
        e.preventDefault();
        window.location.href = androidIntent;
        return;
      }

      if (isIOS) {
        e.preventDefault();
        // api.whatsapp.com is more reliable on iPhone Safari / Instagram browser
        window.location.href = api;
        return;
      }

      // Desktop: new tab WhatsApp Web
      e.preventDefault();
      window.open(waMe, "_blank", "noopener,noreferrer");
    },
    [androidIntent, api, waMe]
  );

  return (
    <a
      href={waMe}
      onClick={handleClick}
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-105 hover:bg-gray-50 active:scale-95"
    >
      <PakistanFlag className="h-4 w-6 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-black/10" />
      <span>Chat</span>
    </a>
  );
}
