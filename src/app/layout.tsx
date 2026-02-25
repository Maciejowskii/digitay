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

export const metadata: Metadata = {
  title: "Digitay | Zamieniamy pomysły w działające produkty",
  description: "Cyfrowa agencja i software house. Analiza, design, development i wdrożenie. Skup się na wizji, my zajmiemy się realizacją.",
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
