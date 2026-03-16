import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://digitay.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Digitay | Zamieniamy pomysły w działające produkty",
  description: "Cyfrowa agencja i software house. Analiza, design, development i wdrożenie. Skup się na wizji, my zajmiemy się realizacją.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Digitay",
    title: "Digitay | Zamieniamy pomysły w działające produkty",
    description: "Cyfrowa agencja i software house. Analiza, design, development i wdrożenie.",
    images: [
      {
         url: "/opengraph-image.png", // Dodamy ten obrazek do /public w przyszlosci dla default state
         width: 1200,
         height: 630,
         alt: "Digitay Open Graph Image",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitay | Zamieniamy pomysły w działające produkty",
    description: "Cyfrowa agencja i software house. Analiza, design, development i wdrożenie.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark scroll-smooth">
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-body bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
