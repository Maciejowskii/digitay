"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, CheckCircle2, Plus, Minus, ArrowDown, Globe, ShoppingCart, Search, Target, Megaphone } from "lucide-react";
import { useState, useRef } from "react";

// ─── Data ───



const SERVICES = [
  {
    name: "Strony Internetowe",
    shortDescription: "Od efektownych wizytówek po rozbudowane portale. High-endowy design, który hipnotyzuje i konwertuje od pierwszego kliknięcia.",
    features: ['Customowy Web Design', 'Next.js & React', 'Techniczne SEO', 'CMS Headless'],
    slug: "tworzenie-stron",
    icon: Globe,
    accent: "#19A354",
  },
  {
    name: "Sklepy Internetowe",
    shortDescription: "E-commerce zoptymalizowany pod konwersję. Konfiguracja produktów, płatności, automaty porzuconych koszyków i pełen tracking.",
    features: ['Konfiguracja Sklepu', 'Płatności & Dostawy', 'SEO E-commerce', 'Automaty & Integracje'],
    slug: "sklepy-internetowe",
    icon: ShoppingCart,
    accent: "#22D06A",
  },
  {
    name: "Pozycjonowanie SEO",
    shortDescription: "Podejście data-driven. Skalowalne strategie SEO, które podnoszą widoczność i przyciągają ruch, który konwertuje.",
    features: ['Audyt Kompletny', 'Link Building', 'Optymalizacja On-Site', 'Content Strategy'],
    slug: "pozycjonowanie-seo",
    icon: Search,
    accent: "#10B981",
  },
  {
    name: "Kampanie Google Ads",
    shortDescription: "Search, PMax, YouTube — precyzyjne targetowanie i ciągła optymalizacja pod realny zwrot z inwestycji reklamowej.",
    features: ['Search & PMax', 'Remarketing', 'Testy A/B', 'Raportowanie ROAS'],
    slug: "kampanie-google-ads",
    icon: Target,
    accent: "#0D9488",
  },
  {
    name: "Reklamy Facebook Ads",
    shortDescription: "Kampanie na Facebooku i Instagramie. Prospecting, remarketing i skalowanie — scroll zamieniony w sprzedaż.",
    features: ['Prospecting', 'Remarketing', 'Kreacje & Wideo', 'Skalowanie ROAS'],
    slug: "reklamy-facebook-ads",
    icon: Megaphone,
    accent: "#6366F1",
  },
];

const FAQS = [
  {
    q: "Jak wygląda proces współpracy?",
    a: "Zaczynamy od dogłębnej analizy Twoich celów. Następnie przechodzimy do strategii, projektowania UI/UX, a na końcu do wdrożenia i optymalizacji. Cały proces przebiega zwinnie (Agile), a Ty masz stały dostęp do repozytorium i efektów.",
  },
  {
    q: "Ile kosztują usługi w Digitay?",
    a: "Nasze wyceny są zawsze indywidualne i zależą od zakresu prac. Stawiamy na modele Fixed-Price (stała kwota z góry) lub abonamentowe utrzymanie projektów. Gwarantujemy czystą kalkulację ROI.",
  },
  {
    q: "Jak mierzycie efektywność działań?",
    a: "Skupiamy się na twardych metrykach: wzroście ruchu organicznego, leadach i docelowej sprzedaży. Konfigurujemy najnowsze tagi i platformy analityczne bezpośrednio na produkcie.",
  },
];

// ─── Sub-components ───

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-b border-white/5"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`font-heading font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? "text-primary" : "text-white group-hover:text-white/80"}`}>
          {faq.q}
        </span>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-colors duration-300 ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-white/10 group-hover:border-primary/30 group-hover:bg-white/5'}`}>
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary" />
          ) : (
            <Plus className="w-4 h-4 text-white/40 group-hover:text-white" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/40 text-base md:text-lg leading-relaxed pb-8 pt-2 max-w-3xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page Client ───

export default function ServicesPageClient() {
  // Parallax Hero
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

  return (
    <div className="bg-background text-white selection:bg-primary/30 selection:text-white pb-24 overflow-hidden">
      
      {/* ═══════════════════════════════════════════════
          PARALLAX HERO
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
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-30 select-none grayscale mix-blend-luminosity brightness-150 contrast-125 hover:grayscale-0 transition-all duration-[2s]"
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
            Ekosystem Usług
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
              ARCHITEKTURA
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[12vw] sm:text-[14vw] md:text-[10vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              CYFROWA<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            To nie jest zwykłe wdrożenie strony. Budujemy pełnokrwiste, zoptymalizowane pod konwersję platformy cyfrowe dla liderów rynku.
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
          SERVICES GRID — Główna sekcja usług
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
              Co robimy
            </span>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.9]">
                Nasze <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">usługi.</span>
              </h2>
              <p className="text-white/40 text-lg max-w-md leading-relaxed">
                Każda usługa to osobny ekosystem — od strategii po wdrożenie i optymalizację. Kliknij, by poznać szczegóły i cenniki.
              </p>
            </div>
          </motion.div>

          {/* Top row: 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {SERVICES.slice(0, 2).map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/uslugi/${service.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block group relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 md:p-12 hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-500 h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute right-8 top-8 text-8xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.04] transition-colors select-none pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                      <service.icon className="w-7 h-7 text-white/70 group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8 flex-grow">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.features.map((f) => (
                        <span key={f} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 text-xs font-medium group-hover:border-primary/20 group-hover:text-white/70 transition-colors">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-white/60 group-hover:text-primary transition-colors font-bold text-sm">
                      Poznaj szczegóły i cennik
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: 3 medium cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(2).map((service, idx) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx + 2) * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/uslugi/${service.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block group relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 md:p-10 hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-500 h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute right-6 top-6 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.04] transition-colors select-none pointer-events-none">
                    {String(idx + 3).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                      <service.icon className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((f) => (
                        <span key={f} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 text-[11px] font-medium group-hover:border-primary/20 group-hover:text-white/70 transition-colors">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-white/60 group-hover:text-primary transition-colors font-bold text-sm">
                      Cennik i szczegóły
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-primary font-heading font-bold text-sm tracking-widest">FAQ</span>
            <span className="text-white/40 text-sm tracking-widest uppercase">Najczęstsze pytania</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </motion.div>

          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM MEGA CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center bg-black/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-[2/1] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
              Konkret. Bez domysłów.
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95] text-white mb-8">
              Skalujmy Twój <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light pr-4 pb-2">biznes.</span>
            </h2>
            <p className="text-white/50 text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Skontaktuj się z nami, a wykonamy bezpłatny fundament analityczny na darmowym callu wstępnym. Zdobądź wycenę w 24 godziny.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-background px-12 py-6 rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Rozpocznij projekt
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
