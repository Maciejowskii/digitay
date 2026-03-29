"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Handshake,
  ExternalLink,
} from "lucide-react";
import { useRef } from "react";

type CaseStudyDetail = {
  id: number;
  slug: string;
  clientName: string;
  clientLogo: string | null;
  clientUrl: string | null;
  brandColor: string | null;
  title: string;
  description: string | null;
  category: string | null;
  challenge: string | null;
  solution: string | null;
  results: Record<string, string> | null;
  coverImage: string | null;
  tags: string[] | null;
  createdAt: Date;
};

type Props = {
  caseStudy: CaseStudyDetail;
  nextCaseStudy?: { slug: string; title: string; clientName: string } | null;
};

export default function CaseStudyDetailClient({
  caseStudy,
  nextCaseStudy,
}: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const brandColor = caseStudy.brandColor || "#FF6600";
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.5], ["0px", "80px"]);

  const results = caseStudy.results as Record<string, string> | null;
  const tags = Array.isArray(caseStudy.tags)
    ? caseStudy.tags
    : typeof caseStudy.tags === "string"
    ? (() => {
        try {
          return JSON.parse(caseStudy.tags);
        } catch {
          return [];
        }
      })()
    : [];

  return (
    <div className="bg-background text-white selection:bg-primary/30 selection:text-white">
      {/* ═══════ PARALLAX HERO ═══════ */}
      <section
        ref={heroRef}
        className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden"
      >
        {/* Background Image */}
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0 z-0 origin-bottom"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/70 to-background/30" />
          {caseStudy.coverImage ? (
            <Image
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              fill
              className="object-cover opacity-50 select-none"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
          )}
        </motion.div>

        {/* Hero Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-primary/15 rounded-full blur-[200px] pointer-events-none z-0" />

        {/* Content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 md:pb-24"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm mb-8 font-medium">
            <Link
              href="/case-study"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{caseStudy.clientName}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {caseStudy.category && (
              <span className="text-primary text-xs tracking-widest uppercase font-bold bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                {caseStudy.category}
              </span>
            )}
            {tags.slice(0, 4).map((tag: string, i: number) => (
              <span
                key={i}
                className="text-white/40 text-xs tracking-wide border border-white/10 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] text-white max-w-4xl mb-6">
            {caseStudy.title}
          </h1>

          {/* Description */}
          {caseStudy.description && (
            <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed">
              {caseStudy.description}
            </p>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ═══════ RESULTS METRICS BAR ═══════ */}
      {results && Object.keys(results).length > 0 && (
        <section className="relative z-20 bg-black/40 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {Object.entries(results).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="py-10 md:py-14 px-4 md:px-8 text-center group"
                >
                  <div className="text-3xl md:text-5xl font-heading font-black text-white tracking-tight group-hover:text-primary transition-colors duration-500 mb-2">
                    {value}
                  </div>
                  <div className="text-white/40 text-xs md:text-sm uppercase tracking-widest font-medium">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CLIENT INFO SIDEBAR + CHALLENGE ═══════ */}
      <section className="py-20 md:py-32 bg-background relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                {/* Client card */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    {caseStudy.clientLogo ? (
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                        <Image
                          src={caseStudy.clientLogo}
                          alt={`${caseStudy.clientName} logo`}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl shrink-0">
                        {caseStudy.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {caseStudy.clientName}
                      </h3>
                      {caseStudy.category && (
                        <span className="text-white/40 text-sm">
                          {caseStudy.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium text-white/40 border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Client website link */}
                  {caseStudy.clientUrl && (
                    <a
                      href={caseStudy.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 text-white/50 text-sm font-medium hover:text-white hover:bg-white/[0.03] transition-all duration-300"
                      style={{ 
                        WebkitTapHighlightColor: "transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${brandColor}4D`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      }}
                    >
                      <ExternalLink className="w-4 h-4 transition-colors" />
                      Odwiedź stronę klienta
                    </a>
                  )}
                </div>

                {/* Quick results */}
                {results && (
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/[0.02] border border-primary/10">
                    <h4 className="text-primary text-xs tracking-widest uppercase font-bold mb-6 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Kluczowe wyniki
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(results).map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-white/50 text-sm">
                            {label}
                          </span>
                          <span className="font-heading font-black text-white text-lg">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* ─── CHALLENGE SECTION ─── */}
              {caseStudy.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="mb-20"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <span className="text-red-400/60 text-xs tracking-widest uppercase font-bold block">
                        Problem
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
                        Wyzwanie
                      </h2>
                    </div>
                  </div>

                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
                      prose-h3:text-2xl prose-h3:text-white prose-h3:mt-0 prose-h3:mb-6
                      prose-h4:text-lg prose-h4:text-primary prose-h4:mt-8 prose-h4:mb-4
                      prose-p:text-white/60 prose-p:leading-relaxed
                      prose-li:text-white/60 prose-li:leading-relaxed
                      prose-strong:text-white prose-strong:font-semibold
                      prose-em:text-primary/80
                      prose-ul:space-y-2
                    "
                    dangerouslySetInnerHTML={{
                      __html: caseStudy.challenge,
                    }}
                  />
                </motion.div>
              )}

              {/* ─── SOLUTION SECTION ─── */}
              {caseStudy.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="mb-20"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-primary/60 text-xs tracking-widest uppercase font-bold block">
                        Strategia
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
                        Rozwiązanie
                      </h2>
                    </div>
                  </div>

                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
                      prose-h3:text-2xl prose-h3:text-white prose-h3:mt-0 prose-h3:mb-6
                      prose-h4:text-lg prose-h4:text-primary prose-h4:mt-10 prose-h4:mb-4
                      prose-p:text-white/60 prose-p:leading-relaxed
                      prose-li:text-white/60 prose-li:leading-relaxed
                      prose-strong:text-white prose-strong:font-semibold
                      prose-em:text-primary/80
                      prose-ul:space-y-2
                    "
                    dangerouslySetInnerHTML={{
                      __html: caseStudy.solution,
                    }}
                  />
                </motion.div>
              )}

              {/* ─── RESULTS HIGHLIGHT ─── */}
              {results && Object.keys(results).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="mb-20"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-emerald-400/60 text-xs tracking-widest uppercase font-bold block">
                        Efekty
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading font-black text-white tracking-tight">
                        Wyniki
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(results).map(([label, value], i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-all duration-500 overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                          <div className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight group-hover:text-primary transition-colors duration-500 mb-3">
                            {value}
                          </div>
                          <div className="text-white/40 text-sm uppercase tracking-widest font-medium">
                            {label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Why it worked */}
                  <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                    <h4 className="text-primary font-bold text-lg mb-4">
                      Dlaczego ta strategia zadziałała?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Lokalne SEO = zaufanie i widoczność",
                        "Reklamy = szybkość i skalowalność",
                        "Analityka = decyzje oparte na danych",
                        "Strona = konwersja, nie \u201Eładny design\u201D",
                      ].map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-white/60 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/40 text-sm mt-6 italic">
                      To system, nie pojedyncze działania.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PARTNERSHIP SECTION ═══════ */}
      {caseStudy.clientLogo && (
        <section className="relative overflow-hidden border-t border-white/5">
          {/* Brand glow background */}
          <div 
            style={{ backgroundImage: `linear-gradient(to right, ${brandColor}0D, transparent, ${brandColor}0D)` }}
            className="absolute inset-0 pointer-events-none" 
          />
          <div 
            style={{ backgroundColor: `${brandColor}14` }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none" 
          />
          
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              {/* Logo */}
              <div className="shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    backgroundColor: brandColor,
                    borderColor: `${brandColor}4D`,
                    boxShadow: `0 0 60px ${brandColor}26`,
                  }}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2"
                >
                  <Image
                    src={caseStudy.clientLogo}
                    alt={`${caseStudy.clientName} logo`}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <div 
                    style={{ backgroundColor: `${brandColor}1A`, borderColor: `${brandColor}33` }}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center"
                  >
                    <Handshake style={{ color: brandColor }} className="w-5 h-5" />
                  </div>
                  <span style={{ color: brandColor }} className="text-xs tracking-widest uppercase font-bold">
                    Stały Partner
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.1] mb-6">
                  {caseStudy.clientName} to dziś nasz{" "}
                  <span style={{ color: brandColor }}>
                    stały partner.
                  </span>
                </h2>

                <p className="text-white/50 text-lg leading-relaxed max-w-2xl mb-8">
                  Współpraca, która zaczęła się od jednorazowego projektu, przerodziła się w długoterminowe partnerstwo. Nieprzerwanie rozwijamy obecność online {caseStudy.clientName}, wdrażając nowe strategie i optymalizując istniejące kanały pozyskiwania klientów.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {[
                    { label: "Ciągła optymalizacja SEO", Icon: Target },
                    { label: "Skalowanie kampanii Ads", Icon: TrendingUp },
                    { label: "Rozwój strategii digital", Icon: ArrowUpRight },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 px-5 py-3 rounded-full text-sm text-white/60 hover:text-white transition-all duration-300"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${brandColor}33`; // 20%
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)"; // white/5
                      }}
                    >
                      <item.Icon style={{ color: brandColor }} className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════ NEXT CASE STUDY ═══════ */}
      {nextCaseStudy && (
        <section className="border-t border-white/5 bg-black/20">
          <Link
            href={`/case-study/${nextCaseStudy.slug}`}
            className="block group"
          >
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 flex items-center justify-between">
              <div>
                <span className="text-white/30 text-xs tracking-widest uppercase font-bold mb-4 block">
                  Następna realizacja
                </span>
                <h3 className="text-2xl md:text-4xl font-heading font-black text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                  {nextCaseStudy.title}
                </h3>
                <span className="text-white/40 text-sm mt-2 block">
                  {nextCaseStudy.clientName}
                </span>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ═══════ CTA SECTION ═══════ */}
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
              Twoja firma jest następna
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] text-white mb-8">
              Chcesz podobnych{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light pr-4 pb-2">
                wyników?
              </span>
            </h2>
            <p className="text-white/50 text-lg lg:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Umów darmową konsultację. Pokażemy Ci, jak zwiększyć sprzedaż w
              Twojej firmie — bez ogólników, z konkretnymi działaniami.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Umów darmową konsultację
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
