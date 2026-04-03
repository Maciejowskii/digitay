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
  title: "Digitay | Cyfrowa Agencja Marketingowa dla MŚP",
  description: "Eksperckie tworzenie stron, sklepów i kampanii reklamowych (Ads/SEO). Pomagamy małym i średnim firmom rosnąć dzięki danym i designowi.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Digitay",
    title: "Digitay | Twoja przewaga w cyfrowym świecie",
    description: "Profesjonalne strony WWW, e-commerce i skuteczny marketing. Sprawdź, jak Digitay wspiera rozwój Twojego biznesu.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  twitter: {
    card: "summary",
    title: "Digitay | Cyfrowa Agencja Marketingowa",
    description: "Skuteczne kampanie i nowoczesne strony internetowe dla sektora MŚP.",
  }
};

import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark scroll-smooth">
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-body bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-white`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
