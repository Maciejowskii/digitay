"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe, Smartphone, TrendingUp, Palette, Code, BarChart3, Search, Megaphone } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// ─── Data ───

const CAPABILITIES = [
  { icon: Globe, label: "Strony WWW" },
  { icon: Code, label: "Aplikacje Web" },
  { icon: Smartphone, label: "Aplikacje Mobile" },
  { icon: Palette, label: "UI/UX Design" },
  { icon: Search, label: "SEO" },
  { icon: Megaphone, label: "Google Ads" },
  { icon: BarChart3, label: "Analityka" },
  { icon: TrendingUp, label: "Growth Marketing" },
];

const SERVICES = [
  {
    tags: ["next.js", "react", "gsap", "seo"],
    title: "Strony Internetowe",
    description:
      "Wydajne, szybkie i zoptymalizowane pod SEO strony internetowe. Od wizytówek po rozbudowane portale korporacyjne. Każda strona to produkt, który konwertuje.",
    href: "/kontakt",
  },
  {
    tags: ["react native", "node.js", "typescript", "firebase"],
    title: "Aplikacje Web & Mobile",
    description:
      "Szyte na miarę systemy SaaS, platformy e-commerce i natywne aplikacje iOS/Android. Oprogramowanie, które użytkownicy kochają, a biznes potrzebuje.",
    href: "/kontakt",
  },
  {
    tags: ["google ads", "meta ads", "seo", "content"],
    title: "Marketing & Reklama",
    description:
      "Precyzyjne kampanie reklamowe, strategia SEO i content marketing. Napędzamy ruch, który konwertuje na realny przychód i mierzalny wzrost.",
    href: "/kontakt",
  },
];

const PACKAGES = [
  {
    title: "Projekt na Miarę",
    description:
      "Wspólnie definiujemy zakres, cele i harmonogram. Dostajesz dokładnie to czego potrzebujesz — bez zbędnych kosztów, bez niespodzianek.",
    features: [
      "Dokładna wycena z góry",
      "Jasne kamienie milowe",
      "Stały kontakt z zespołem",
      "Gwarancja jakości",
    ],
  },
  {
    title: "Ciągłe Doskonalenie",
    description:
      "Rozwijaj swój produkt w swoim tempie. Iteruj, testuj, ulepszaj — aż osiągniesz perfekcję. I dalej.",
    features: [
      "Elastyczny budżet miesięczny",
      "Priorytetyzacja backlogu",
      "Sprint reviews co 2 tygodnie",
      "Skalowanie w górę i w dół",
    ],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Odkrywanie",
    desc: "Warsztaty, analiza rynku, research użytkowników. Rozumiemy Twój biznes zanim napiszemy linijkę kodu.",
  },
  {
    num: "02",
    title: "Strategia & Design",
    desc: "Wireframy, prototypy, finalne UI. Projektujemy z myślą o konwersji i doświadczeniu użytkownika.",
  },
  {
    num: "03",
    title: "Development",
    desc: "Agile, CI/CD, code review. Budujemy w sprintach, dostarczamy szybko i iterujemy na podstawie feedbacku.",
  },
  {
    num: "04",
    title: "Launch & Wzrost",
    desc: "Wdrożenie, monitoring, optymalizacja. Mierzymy, analizujemy i pomagamy rosnąć po premierze.",
  },
];

const FAQS = [
  {
    q: "Jak wygląda proces współpracy?",
    a: "Zaczynamy od dogłębnej analizy Twoich celów. Następnie przechodzimy do strategii, projektowania UI/UX, a na końcu do wdrożenia i optymalizacji. Cały proces jest transparentny, a Ty masz stały dostęp do postępów w projekcie.",
  },
  {
    q: "Ile kosztują usługi?",
    a: "Nasze wyceny są zawsze indywidualne i zależą od zakresu prac. Przygotowujemy transparentne oferty, które odzwierciedlają realny nakład pracy i planowany zwrot z inwestycji.",
  },
  {
    q: "Jak mierzycie efektywność?",
    a: "Skupiamy się na twardych metrykach: wzroście ruchu organicznego, leadach i konwersji sprzedaży. Korzystamy z zaawansowanych narzędzi analitycznych.",
  },
  {
    q: "Jakie technologie wykorzystujecie?",
    a: "Głównie Next.js, React, TypeScript, Node.js i React Native. Dobieramy stos technologiczny do potrzeb projektu, nie na odwrót.",
  },
];

// ─── Main Component ───

export default function ServicesPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-background text-white">
      {/* ═══════════════════════════════════════════════
          HERO / MANIFESTO
      ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center overflow-hidden pt-32"
      >
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-6xl mx-auto px-6 md:px-12 relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tight leading-[1] mb-8"
          >
            Kwestionujemy to co jest,
            <br />
            <span className="text-white/30 font-light italic">
              żeby kształtować to co będzie.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/45 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Cyfrowy krajobraz ciągle ewoluuje. Przesuwamy granice designu
            i funkcjonalności, tworząc przyszłościowe doświadczenia cyfrowe.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          01. CAPABILITIES
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-primary font-heading font-bold text-sm tracking-widest">
              01.
            </span>
            <span className="text-white/40 text-sm tracking-widest uppercase">
              Kompetencje
            </span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-500 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                  <cap.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-white/60 font-medium text-center group-hover:text-white transition-colors duration-300">
                  {cap.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          02. SWEET SPOT / SERVICE CARDS
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-primary font-heading font-bold text-sm tracking-widest">
              02.
            </span>
            <span className="text-white/40 text-sm tracking-widest uppercase">
              Nasze usługi
            </span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative"
              >
                <Link
                  href={service.href}
                  className="block p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/25 hover:bg-white/[0.04] transition-all duration-500 h-full flex flex-col justify-between min-h-[420px]"
                >
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-white/25 tracking-wider uppercase"
                        >
                          [ {tag} ]
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Dowiedz się więcej</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          03. HOW WE WORK (Process)
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-primary font-heading font-bold text-sm tracking-widest">
              03.
            </span>
            <span className="text-white/40 text-sm tracking-widest uppercase">
              Jak pracujemy
            </span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/45 text-lg max-w-2xl mb-20 leading-relaxed"
          >
            Stosujemy metodykę Agile w każdym projekcie. Pozwala to szybko
            reagować na potrzeby użytkowników i zmieniające się wymagania.
          </motion.p>

          {/* Process timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <span className="text-5xl font-heading font-black text-white/[0.04] group-hover:text-primary/10 transition-colors duration-500 block mb-4">
                  {step.num}
                </span>
                <h4 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-white/35 text-sm leading-relaxed">
                  {step.desc}
                </p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all duration-500"
              >
                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {pkg.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-white/50 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300"
                >
                  Rozpocznij współpracę
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          04. FAQ
      ═══════════════════════════════════════════════ */}
      <section className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-primary font-heading font-bold text-sm tracking-widest">
              04.
            </span>
            <span className="text-white/40 text-sm tracking-widest uppercase">
              FAQ
            </span>
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
          CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white leading-[1.05] mb-6">
                Potrzebujesz czegoś
                <br />
                <span className="text-white/30 font-light italic">
                  wyjątkowego?
                </span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-8">
                Nie gryziem. Skontaktuj się lub wpadnij na kawę. Chętnie
                poznamy Twój projekt i zaproponujemy rozwiązanie.
              </p>
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.25)]"
              >
                Umów rozmowę
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-col justify-center p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                Nie masz czasu na kawę?
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Wyślij nam informacje o tym czego szukasz, a my odpiszemy
                z pomysłami i wstępną wyceną.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300"
              >
                Poproś o wycenę
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQ Accordion Item ───
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence } from "framer-motion";

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
        <span className={`font-heading font-bold text-lg transition-colors duration-300 ${isOpen ? "text-primary" : "text-white group-hover:text-white/80"}`}>
          {faq.q}
        </span>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 ml-4 group-hover:border-primary/30 transition-colors duration-300">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white/40" />
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
            <p className="text-white/40 text-sm leading-relaxed pb-6 max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
