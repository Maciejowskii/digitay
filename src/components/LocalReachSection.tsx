"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CITIES } from "@/data/cities";

interface LocalReachSectionProps {
  serviceName: string;
  baseSlug: string;
}

export default function LocalReachSection({ serviceName, baseSlug }: LocalReachSectionProps) {
  // Split cities into two columns
  const midPoint = Math.ceil(CITIES.length / 2);
  const leftColumn = CITIES.slice(0, midPoint);
  const rightColumn = CITIES.slice(midPoint);

  return (
    <section className="py-24 md:py-32 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <div>
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-bold mb-4 block">
              [GDZIE DZIAŁAMY]
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.9]">
              Zobacz Jak Działamy <br />
              W Innych Miastach
            </h2>
          </div>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(25,163,84,0.3)]"
          >
            Sprawdzam
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((city) => (
              <Link
                key={city.slug}
                href={`/uslugi/${baseSlug}/${city.slug}`}
                className="group flex items-center gap-3 text-white/40 hover:text-primary transition-colors text-lg md:text-xl font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors shrink-0" />
                {serviceName} {city.name}
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((city) => (
              <Link
                key={city.slug}
                href={`/uslugi/${baseSlug}/${city.slug}`}
                className="group flex items-center gap-3 text-white/40 hover:text-primary transition-colors text-lg md:text-xl font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors shrink-0" />
                {serviceName} {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
    </section>
  );
}
