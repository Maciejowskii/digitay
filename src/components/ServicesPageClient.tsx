"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, CheckCircle2, Zap, LayoutTemplate, GaugeCircle, Plus, Minus, ArrowDown } from "lucide-react";
import ServicesBento from "@/components/ServicesBento";
import { useState, useRef } from "react";

// ─── Data ───

const DOMAINS = [
  {
    id: "01",
    icon: GaugeCircle,
    title: "Performance First",
    subtitle: "Prędkość jako waluta",
    desc: "Z każdą sekundą ładowania strony tracisz klientów. Architektury, które wdrażamy ładują się błyskawicznie, uzyskując 100/100 punktów Google Lighthouse. Nie znosisz wolno działającego internetu? Twoi klienci też nie.",
  },
  {
    id: "02",
    icon: LayoutTemplate,
    title: "Premium Design",
    subtitle: "Rygor wizualny",
    desc: "Zanim napiszemy linijkę kodu, tworzymy prototypy, które zachwycają. Estetyka na poziomie marek premium połączona z twardą logiką konwersji (UX/UI). Nie robimy szablonów. Każdy projekt to unikalne cyfrowe doświadczenie.",
  },
  {
    id: "03",
    icon: Zap,
    title: "Szyte na Miarę",
    subtitle: "Zrozumienie biznesu",
    desc: "Odrzucamy obciążające systemy. Piszemy aplikacje rozwiązujące Twoje konkretne wąskie gardła. Twój system powinien dopasowywać się do Ciebie, a nie Ty do systemu.",
  }
];

const SERVICES = [
  {
    name: "Strony Internetowe",
    shortDescription: "Wydajne, szybkie i zoptymalizowane pod SEO strony internetowe. Od efektownych wizytówek po rozbudowane portale korporacyjne. Każda strona to produkt, który ma jeden cel - konwertować.",
    features: ['Customowy Web Design', 'Next.js & React', 'Techniczne SEO', 'CMS Headless'],
    slug: "strony-internetowe"
  },
  {
    name: "Aplikacje Web & Mobile",
    shortDescription: "Szyte na miarę systemy SaaS, platformy e-commerce i natywne aplikacje iOS/Android. Oprogramowanie, które użytkownicy kochają, a biznes potrzebuje do łatwego skalowania.",
    features: ['Aplikacje PWA i Natywne', 'Złożone systemy CRM', 'Sklepy e-Commerce', 'API i Integracje'],
    slug: "aplikacje"
  },
  {
    name: "Marketing & Sprzedaż",
    shortDescription: "Precyzyjne kampanie reklamowe, innowacyjna strategia SEO i content marketing. Napędzamy ruch, który zamienia się w realny przychód i dominację w wynikach wyszukiwania.",
    features: ['Kampanie Ads', 'Pozycjonowanie', 'Leady B2B', 'Optymalizacja Konwersji'],
    slug: "marketing"
  }
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

function ServiceAccordion({ service, index, expanded, setExpanded }: { service: any, index: number, expanded: number | null, setExpanded: (val: number | null) => void }) {
  const isExpanded = expanded === index;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className={`border-b border-white/5 overflow-hidden transition-colors duration-500 ${isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"}`}
    >
      <button 
        onClick={() => setExpanded(isExpanded ? null : index)}
        className="w-full flex items-center justify-between py-6 md:py-8 px-4 md:px-8 group text-left"
      >
        <div className="flex items-center gap-6 md:gap-12">
          <span className={`font-mono text-sm md:text-base transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-white/20 group-hover:text-white/40'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={`text-2xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase transition-all duration-300 ${isExpanded ? 'text-white translate-x-2 md:translate-x-4' : 'text-white/70 group-hover:text-white group-hover:translate-x-2'}`}>
            {service.name}
          </h3>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline-flex font-mono text-[10px] md:text-xs text-white/30 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-primary/20 group-hover:text-white/60 transition-colors">
            Więcej
          </span>
          <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-primary border-primary text-white rotate-180' : 'bg-transparent text-white/50 group-hover:bg-white/5'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="px-4 md:px-8 pb-8 pt-4 lg:ml-20 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
              {/* Opis krótki */}
              <div className="flex-1">
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link 
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-white text-background px-6 py-3 rounded-full font-bold text-sm lg:text-base hover:bg-white/90 transition-colors group"
                >
                  Zapytaj o szczegóły
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Box graficzny */}
              <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-6 flex flex-col justify-end relative overflow-hidden group/box hidden sm:flex">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-3xl pointer-events-none rounded-full" />
                
                <h4 className="text-xl font-heading font-bold text-white mb-2 relative z-10">{service.name}</h4>
                <p className="font-mono text-xl text-primary font-black relative z-10">Premium</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

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
          DEEP CONTENT / DOMAINS (Sticky Approach)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sticky Header Side */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                  Nasze Podejście
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Dlaczego <br/> wymiatają?
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  W dobie przeciętności, genialna szybkość i design wyróżnią Cię natychmiast. Porzucamy uciążliwe szablony na rzecz natywnych, dopieszczonych systemów.
                </p>
              </div>
            </div>

            {/* Scrolling Expertise Cards */}
            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 pt-8 lg:pt-0">
              {DOMAINS.map((domain) => (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none select-none">
                    {domain.id}
                  </div>

                  <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500 relative z-10">
                    <domain.icon className="w-8 h-8 text-primary group-hover:drop-shadow-[0_0_8px_rgba(25,163,84,0.5)]" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">{domain.title}</h3>
                  <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">{domain.subtitle}</span>
                  
                  <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                    {domain.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BENTO GRID INTEGRATION (Existing ServicesBento)
      ═══════════════════════════════════════════════ */}
      <div className="border-y border-white/5 relative z-20">
        <ServicesBento />
      </div>

      {/* ═══════════════════════════════════════════════
          ACCORDION LIST (Skorowidz)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 md:mb-20 gap-8">
            <div>
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-primary uppercase mb-6 block">
                [ SKOROWIDZ TECHNOLOGICZNY ]
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9]">
                PEŁEN PRZEKRÓJ <br/> KOMPETENCJI.
              </h2>
            </div>
          </div>

          <div className="border-t border-white/10">
            {SERVICES.map((service, idx) => (
              <ServiceAccordion 
                key={service.slug} 
                service={service} 
                index={idx}
                expanded={expandedIndex}
                setExpanded={setExpandedIndex}
              />
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
            <span className="text-primary font-heading font-bold text-sm tracking-widest">04.</span>
            <span className="text-white/40 text-sm tracking-widest uppercase">FAQ</span>
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
