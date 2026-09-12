"use client";

import { MessageCircle } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923700822968";
const defaultMessage =
  "Hi, I would like to know more about Clothhub Pakistani clothes.";

export function WhatsAppChatButton() {
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-green-700"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp Chat</span>
    </a>
  );
}
