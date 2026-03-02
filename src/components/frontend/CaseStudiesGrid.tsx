"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type CaseStudy = {
  id: number;
  slug: string;
  clientName: string;
  title: string;
  coverImage: string | null;
  tags: unknown;
};

// Blur placeholder for images
const blurDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQyV2P4//8/AwAI/AL+X1oOigAAAABJRU5ErkJggg==";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// Magnetic Button implementation
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
    >
      {children}
    </motion.div>
  );
};

export const CaseStudiesGrid = ({ caseStudies }: { caseStudies: CaseStudy[] }) => {
  // Safe parsing for tags if it's stored as JSON
  const getTags = (tagsRaw: unknown): string[] => {
    if (Array.isArray(tagsRaw)) return tagsRaw as string[];
    if (typeof tagsRaw === 'string') {
        try { return JSON.parse(tagsRaw); } catch { return []; }
    }
    return [];
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
    >
      {caseStudies.map((study) => (
        <motion.div key={study.id} variants={itemVariants} className="group cursor-pointer">
          <Link href={`/case-studies/${study.slug}`} className="block relative overflow-hidden rounded-3xl aspect-[4/3] bg-zinc-100">
            {/* Image container */}
            <motion.div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={study.coverImage || "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2940&auto=format&fit=crop"} // Fallback image setup
                alt={study.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                loading="lazy"
              />
            </motion.div>

            {/* Dark overlay specifically on hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40 z-10" />

            {/* Magnetic Button */}
            <MagneticButton>
              <div className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out bg-brand-green text-zinc-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl shadow-brand-green/20">
                Zobacz wyniki
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </MagneticButton>

            {/* Content pinned to bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex gap-2 mb-4 flex-wrap">
                {getTags(study.tags).slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="text-xs font-medium uppercase tracking-wider text-white border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-jakarta leading-tight mb-2">
                {study.title}
              </h3>
              <p className="text-zinc-300 font-medium">
                Dla: {study.clientName}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}

      {caseStudies.length === 0 && (
         <div className="col-span-full py-20 text-center text-zinc-500">
            Katalog case studies jest chwilowo pusty.
         </div>
      )}
    </motion.div>
  );
};
