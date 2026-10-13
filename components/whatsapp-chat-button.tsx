"use client";

const defaultMessage =
  "Hi, I would like to know more about Haa-Meem Pakistani clothes.";

/** Digits only — country code, no + or spaces */
function getWhatsAppNumber() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923014440787";
  return raw.replace(/\D/g, "");
}

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

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
  const phone = getWhatsAppNumber();
  const text = encodeURIComponent(defaultMessage);
  const webHref = `https://wa.me/${phone}?text=${text}`;

  const openWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isMobileDevice()) {
      let appOpened = false;

      const markOpened = () => {
        appOpened = true;
        window.removeEventListener("blur", markOpened);
        document.removeEventListener("visibilitychange", onVisibility);
      };

      const onVisibility = () => {
        if (document.hidden) markOpened();
      };

      window.addEventListener("blur", markOpened);
      document.addEventListener("visibilitychange", onVisibility);

      // Open WhatsApp app directly
      window.location.href = `whatsapp://send?phone=${phone}&text=${text}`;

      // Fallback only if app did not open
      window.setTimeout(() => {
        window.removeEventListener("blur", markOpened);
        document.removeEventListener("visibilitychange", onVisibility);
        if (!appOpened && !document.hidden) {
          window.location.href = webHref;
        }
      }, 1500);
      return;
    }

    window.open(webHref, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={webHref}
      onClick={openWhatsApp}
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-105 hover:bg-gray-50"
    >
      <PakistanFlag className="h-4 w-6 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-black/10" />
      <span>Chat</span>
    </a>
  );
}
