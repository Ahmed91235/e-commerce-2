import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "ECommerce - Your Online Shopping Destination",
  description: "Discover amazing products at great prices. Fast shipping, secure checkout, and excellent customer service.",
  keywords: "ecommerce, online shopping, products, deals, electronics, fashion, home",
  authors: [{ name: "ECommerce Team" }],
  robots: "index, follow",
  openGraph: {
    title: "ECommerce - Your Online Shopping Destination",
    description: "Discover amazing products at great prices.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECommerce - Your Online Shopping Destination",
    description: "Discover amazing products at great prices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Security headers and CSP will be handled by middleware */}
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://54287.kooder.dev https://57588.kooder.dev;" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}