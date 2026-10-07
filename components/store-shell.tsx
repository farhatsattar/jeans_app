"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppChatButton } from "@/components/whatsapp-chat-button";
import { CartDrawer } from "@/components/cart-drawer";

export function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <CartDrawer />
      <WhatsAppChatButton />
      <Footer />
    </>
  );
}
