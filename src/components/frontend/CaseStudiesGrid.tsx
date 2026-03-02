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
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {caseStudies.map((study, idx) => (
        <motion.div key={study.id} variants={itemVariants} className="group cursor-pointer">
          <Link href={`/case-studies/${study.slug}`} className="block relative overflow-hidden bg-transparent border border-white/10 p-6 flex flex-col h-full min-h-[400px]">
            
            <div className="flex justify-between items-start mb-6">
               <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                 [ CASE // {String(idx + 1).padStart(2, '0')} ]
               </div>
               <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Image container */}
            <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
               <Image
                 src={study.coverImage || "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2940&auto=format&fit=crop"}
                 alt={study.title}
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                 placeholder="blur"
                 blurDataURL={blurDataUrl}
                 loading="lazy"
               />
            </div>

            {/* Content pinned to bottom */}
            <div className="mt-auto flex flex-col gap-4">
              <h3 className="text-white text-2xl lg:text-3xl font-heading font-black tracking-tighter uppercase leading-none">
                {study.title}
              </h3>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                 <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                   Zleceniodawca: <span className="text-white">{study.clientName}</span>
                 </p>
                 <div className="flex gap-2">
                   {getTags(study.tags).slice(0, 2).map((tag, i) => (
                     <span key={i} className="text-[9px] font-mono font-medium uppercase tracking-widest text-zinc-500 bg-white/5 px-2 py-1">
                       {tag}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {caseStudies.length === 0 && (
         <div className="col-span-full py-20 text-center font-mono text-zinc-600 text-sm uppercase tracking-widest">
            [ / / Brak Case Studies ]
         </div>
      )}
    </motion.div>
  );
};
