import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { StoreShell } from "@/components/store-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothhub - Pakistani Stitched Clothes",
  description: "Shop Winter Collection, Cotton Elegant Embroidery Suit, Jeans / Trousers, Fancy Wear, Jewelry and Handbags — premium Pakistani fashion by Haa-Meem.",
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppProviders>
          <StoreShell>{children}</StoreShell>
        </AppProviders>
      </body>
    </html>
  );
}
