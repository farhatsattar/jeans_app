"use client";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923014440787";
const defaultMessage =
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

export function WhatsAppChatButton() {
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-105 hover:bg-gray-50"
    >
      <PakistanFlag className="h-4 w-6 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-black/10" />
      <span>Chat</span>
    </a>
  );
}
