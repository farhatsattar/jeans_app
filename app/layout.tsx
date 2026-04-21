import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppChatButton } from "@/components/whatsapp-chat-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DenimCo - Modern Jeans Store",
  description: "Professional and responsive eCommerce app for premium jeans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <WhatsAppChatButton />
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
