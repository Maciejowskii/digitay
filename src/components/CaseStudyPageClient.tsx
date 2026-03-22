"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Quote } from "lucide-react";
import { useRef, useState } from "react";

// ─── Data Types & Mocks ───

type CaseStudy = {
  id: number;
  slug: string;
  clientName: string;
  title: string;
  description?: string;
  coverImage: string | null;
  tags: unknown;
  category?: string;
};

const blurDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQyV2P4//8/AwAI/AL+X1oOigAAAABJRU5ErkJggg==";

const CATEGORIES = ["Wszystkie", "Web Development", "Design", "Mobile", "Marketing"];

const TESTIMONIALS = [
  {
    text: "Zrozumienie biznesu na poziomie partnerskim, a nie wykonawczym. Stworzyli dla nas aplikację, która przerosła nasze założenia sprzedażowe w pierwszym kwarteale.",
    author: "Michał Kowalski",
    role: "CEO, TechFlow",
  },
  {
    text: "Obsesja na punkcie detalu i designu. To co Digitay nazywa 'standardem', inni określają jako 'wersję premium'. Bezbłędna współpraca od wizji po wdrożenie.",
    author: "Anna Nowak",
    role: "Marketing Director, Innovate",
  }
];

// Helper
function getTags(tagsRaw: unknown): string[] {
  if (Array.isArray(tagsRaw)) return tagsRaw as string[];
  if (typeof tagsRaw === "string") {
    try { return JSON.parse(tagsRaw); } catch { return []; }
  }
  return [];
}

// ─── Main Page Component ───

export default function CaseStudyPageClient({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const [activeFilter, setActiveFilter] = useState("Wszystkie");

  // Hero Parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  
  const textScale = useTransform(smoothProgress, [0, 1], [1, 1.4]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  
  const textLeftX = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const textRightX = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

  const filtered =
    activeFilter === "Wszystkie"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === activeFilter);

  return (
    <div className="bg-background text-white selection:bg-primary/30 selection:text-white">
      {/* ═══════════════════════════════════════════════
          INNOVATIVE PARALLAX HERO
      ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0 z-0 origin-bottom"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-30 select-none"
            priority
          />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/20 rounded-full blur-[200px] pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 md:px-12 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity: textOpacity }}
            className="text-primary text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-8 flex items-center gap-4"
          >
            <span className="w-8 md:w-16 h-[1px] bg-primary/50" />
            Ekskluzywne Portfolio
            <span className="w-8 md:w-16 h-[1px] bg-primary/50" />
          </motion.div>

          <motion.h1
            style={{ scale: textScale, opacity: textOpacity }}
            className="flex flex-col items-center justify-center text-center font-heading font-black origin-center"
          >
            <motion.span
              style={{ x: textLeftX }}
              className="text-[12vw] sm:text-[14vw] md:text-[10vw] tracking-tighter leading-[0.8] block drop-shadow-2xl"
            >
              WYBRANE
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[12vw] sm:text-[14vw] md:text-[10vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              PROJEKTY<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Namacalne dowody naszej skuteczności. Bezkompromisowy design łączymy z inżynieryjną precyzją, by tworzyć maszyny do dominacji na rynku.
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-medium">Przewiń w dół</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          STICKY FILTER BAR
      ═══════════════════════════════════════════════ */}
      <section className="sticky top-0 z-40 bg-background/60 backdrop-blur-2xl border-y border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-[7xl] mx-auto px-6 md:px-12 py-5 flex gap-3 overflow-x-auto no-scrollbar mask-gradient relative justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative text-sm px-6 py-2.5 rounded-full border transition-all duration-300 font-medium whitespace-nowrap shrink-0 overflow-hidden ${
                  isActive
                    ? "border-primary text-white"
                    : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-primary/20 backdrop-blur-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROJECT CARDS GRID (UNIFORM & ELEGANT)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                <ArrowUpRight className="w-10 h-10 rotate-45" />
              </div>
              <p className="text-white/40 text-lg tracking-wide uppercase font-medium">
                Brak realizacji w tej kategorii
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {filtered.map((study, i) => (
                <CaseStudyCard key={study.id} study={study} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS / QUOTES (EYE CATCHY DÓŁ STRONY)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-black/40 border-t border-white/5 relative overflow-hidden">
        {/* Glow behind quotes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Głos Klientów
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight">
              Liczby nie kłamią.<br/>
              <span className="text-white/30 italic font-light">Klienci też nie.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {TESTIMONIALS.map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="relative p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 group hover:border-primary/30 transition-colors duration-500"
              >
                <Quote className="w-16 h-16 text-primary/20 absolute top-8 right-8 group-hover:text-primary/40 group-hover:rotate-12 transition-all duration-500" />
                
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed mb-8 relative z-10 italic">
                  "{quote.text}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {quote.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-wide">{quote.author}</h4>
                    <span className="text-white/40 text-sm">{quote.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MEGA CTA (MATCHING 'O NAS')
      ═══════════════════════════════════════════════ */}
      <section className="pt-24 pb-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
              Twój projekt to następne Case Study
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95] text-white mb-8">
              Stwórzmy razem <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light pr-4 pb-2">historię sukcesu.</span>
            </h2>
            <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Przestań zadowalać się przeciętnością. Zaprojektujemy produkt, który postawi Cię w roli absolutnego lidera.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Porozmawiajmy o projekcie
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Uniform Case Study Card ───
function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const tags = getTags(study.tags);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group col-span-1"
    >
      <Link href={`/case-study/${study.slug}`} className="block h-full">
        <div 
          className="relative flex flex-col h-full rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
        >
          {/* Global Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

          {/* Image Container with Parallax Zoom */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden p-3 md:p-3 shrink-0">
            <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <Image
                src={
                  study.coverImage ||
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                }
                alt={study.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] ease-[0.19,1,0.22,1] group-hover:scale-110 group-hover:rotate-1"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
              {/* Float-up Arrow on Image */}
              <div className="absolute bottom-4 right-4 z-20 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500 delay-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col flex-1 p-6 md:p-8 pt-4 md:pt-4 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-primary text-[10px] md:text-xs tracking-widest uppercase font-bold bg-primary/10 px-3 py-1.5 rounded-full">
                {study.clientName}
              </span>
              {study.category && (
                <span className="text-white/40 text-[10px] md:text-xs px-2 whitespace-nowrap">
                  {study.category}
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-heading font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-500 mb-4">
              {study.title}
            </h3>

            {study.description && (
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-8 font-light group-hover:text-white/60 transition-colors duration-500 flex-1">
                {study.description}
              </p>
            )}

            {/* Tags array */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-[11px] font-bold tracking-wide text-white/30 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-primary/20 group-hover:text-white/80 group-hover:bg-primary/[0.05] transition-colors duration-500"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wide text-white/30 border border-white/5 px-3 py-1.5 rounded-full flex items-center justify-center">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
