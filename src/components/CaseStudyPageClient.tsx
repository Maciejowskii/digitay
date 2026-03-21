"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

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

function getTags(tagsRaw: unknown): string[] {
  if (Array.isArray(tagsRaw)) return tagsRaw as string[];
  if (typeof tagsRaw === "string") {
    try { return JSON.parse(tagsRaw); } catch { return []; }
  }
  return [];
}

export default function CaseStudyPageClient({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const [activeFilter, setActiveFilter] = useState("Wszystkie");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filtered =
    activeFilter === "Wszystkie"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === activeFilter);

  return (
    <div className="bg-background text-white">
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-end overflow-hidden pt-32 pb-16 md:pb-24"
      >
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm tracking-widest mb-8 block"
          >
            [ Realizacje ]
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[0.95] mb-6"
          >
            Case Studies<span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Dowody na naszą skuteczność. Zobacz jak rozwiązywaliśmy realne
            problemy naszych partnerów za pomocą technologii i designu.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Filter bar ─── */}
      <section className="border-y border-white/5 sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-sm px-5 py-2 rounded-full border transition-all duration-300 whitespace-nowrap shrink-0 ${
                activeFilter === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Cards grid ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30 text-sm tracking-widest">
              Brak realizacji w tej kategorii
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {filtered.map((study, i) => (
                <CaseStudyCard key={study.id} study={study} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-6">
              Masz pomysł na projekt<span className="text-primary">?</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">
              Porozmawiajmy o tym jak możemy zamienić Twój pomysł w działający
              produkt cyfrowy.
            </p>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.25)]"
            >
              Rozpocznij projekt
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/case-study/${study.slug}`} className="block">
        {/* Image */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6">
          <Image
            src={
              study.coverImage ||
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            }
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL={blurDataUrl}
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Zobacz projekt <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-primary text-xs tracking-widest uppercase font-medium">
            {study.clientName}
          </span>
          {study.category && (
            <>
              <span className="text-white/15">·</span>
              <span className="text-white/30 text-xs">{study.category}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300 mb-3">
          {study.title}
        </h3>

        {/* Description */}
        {study.description && (
          <p className="text-white/35 text-sm leading-relaxed line-clamp-2 mb-4">
            {study.description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="text-[11px] text-white/25 border border-white/8 px-3 py-1 rounded-full group-hover:border-primary/15 group-hover:text-white/40 transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
