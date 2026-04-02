"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowUpRight, Plus, Check, X, Search, BarChart, Target, FileText, Link2, Settings, Eye, Globe, Gauge, Shield } from "lucide-react";
import Link from "next/link";
import HomeContactForm from "@/components/HomeContactForm";
import LocalReachSection from "@/components/LocalReachSection";

// --- Animations ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

// --- Data ---
const processSteps = [
  { title: "Audyt & Strategia", desc: "Kompleksowa analiza techniczna Twojej strony — od szybkości ładowania, przez strukturę URL, po indeksację w Google. Przeprowadzamy dogłębny keyword research, analizujemy konkurencję i tworzymy spersonalizowaną strategię wzrostu widoczności dopasowaną do Twojej branży.", icon: Search },
  { title: "Optymalizacja On-Site", desc: "Wdrażamy zmiany techniczne (meta tagi, nagłówki, dane strukturalne, schema markup), optymalizujemy treści pod wybrane frazy kluczowe i poprawiamy architekturę informacji serwisu. Dbamy o Core Web Vitals i mobile-first indexing.", icon: Target },
  { title: "Link Building & Raportowanie", desc: "Budujemy silny, naturalny profil linków z tematycznych, zaufanych źródeł. Co miesiąc dostarczamy przejrzysty raport z postępów: pozycje fraz, ruch organiczny, konwersje i rekomendacje dalszych działań.", icon: BarChart }
];

const serviceFeatures = [
  { icon: Search, title: "Audyt SEO", desc: "Pełna analiza techniczna strony — od indeksacji i szybkości ładowania po strukturę linków wewnętrznych i błędy crawlowania." },
  { icon: FileText, title: "Content Marketing", desc: "Tworzenie wartościowych, zoptymalizowanych treści blogowych i landing page'ów, które przyciągają ruch organiczny i budują autorytet." },
  { icon: Link2, title: "Link Building", desc: "Pozyskiwanie backlinków z tematycznych, wysoko ocenianych domen. Naturalna budowa profilu linkowego zgodna z wytycznymi Google." },
  { icon: Settings, title: "Optymalizacja Techniczna", desc: "Poprawa Core Web Vitals, wdrożenie danych strukturalnych (Schema.org), optymalizacja mobile-first i eliminacja błędów technicznych." },
  { icon: Eye, title: "Monitoring Pozycji", desc: "Codzienne śledzenie pozycji Twoich fraz kluczowych w Google. Szybka reakcja na wahania i ciągła optymalizacja strategii." },
  { icon: Globe, title: "SEO Lokalne", desc: "Optymalizacja wizytówki Google Business, pozycjonowanie na frazy lokalne i budowa widoczności w mapach Google dla Twojego regionu." },
  { icon: Gauge, title: "Analityka & Raportowanie", desc: "Comiesięczne raporty z kluczowymi metrykami: ruch organiczny, pozycje TOP 3/10/50, współczynnik konwersji i przychód z kanału SEO." },
  { icon: Shield, title: "Ochrona przed Penalizacją", desc: "Stały monitoring profilu linkowego, wykrywanie toksycznych linków i proaktywna obrona przed penalizacjami algorytmicznymi Google." },
];

const stats = [
  { value: "93%", label: "Ruchu online zaczyna się od wyszukiwarki" },
  { value: "75%", label: "Użytkowników nigdy nie przechodzi na drugą stronę wyników" },
  { value: "14.6%", label: "Współczynnik konwersji z SEO vs 1.7% z outbound" },
  { value: "5.66x", label: "Wyższy ROI z SEO w porównaniu do płatnych reklam" },
];

const faqsData = [
  { q: "Czym dokładnie jest pozycjonowanie SEO?", a: "SEO (Search Engine Optimization) to proces optymalizacji strony internetowej w celu uzyskania wyższych pozycji w organicznych (bezpłatnych) wynikach wyszukiwania Google. Obejmuje działania techniczne, content marketingowe i off-site (link building), które razem zwiększają widoczność Twojego serwisu dla potencjalnych klientów szukających Twoich usług lub produktów." },
  { q: "Kiedy zobaczę pierwsze efekty SEO?", a: "SEO to inwestycja długoterminowa. Pierwsze zauważalne zmiany w pozycjach pojawiają się zazwyczaj po 2-3 miesiącach, natomiast realne efekty biznesowe (wzrost ruchu i konwersji) widoczne są po 4-6 miesiącach konsekwentnych działań. Tempo zależy od konkurencyjności branży, aktualnego stanu strony i budżetu." },
  { q: "Czym różnią się poszczególne pakiety?", a: "Pakiety różnią się intensywnością działań: liczbą monitorowanych fraz kluczowych (100/250/350), ilością pozyskiwanych linków miesięcznie (5/10/15), objętością tworzonych treści (6/10/15 artykułów) oraz elastycznością umowy. Pakiet Pro jako jedyny oferuje umowę na czas nieokreślony." },
  { q: "Czy SEO się opłaca bardziej niż Google Ads?", a: "SEO i Google Ads to komplementarne kanały. SEO wymaga większej cierpliwości, ale generuje ruch organiczny, który nie znika po wyłączeniu budżetu. Statystycznie SEO ma 5.66x wyższy ROI niż płatne reklamy, a konwersja z ruchu organicznego (14.6%) jest niemal 9x wyższa niż z marketingu outbound (1.7%)." },
  { q: "Co się stanie jeśli zakończę współpracę?", a: "Wypracowane pozycje nie znikają z dnia na dzień — to nie reklama pay-per-click. Jednak bez ciągłej optymalizacji i budowy linków, z czasem konkurencja zacznie Cię wyprzedzać. Dlatego rekomendujemy minimum 6-12 miesięcy współpracy dla trwałych rezultatów." },
  { q: "Czy zajmujecie się też stroną techniczną?", a: "Tak, optymalizacja techniczna to jeden z filarów naszej pracy. Obejmuje poprawę szybkości ładowania (Core Web Vitals), wdrożenie danych strukturalnych (Schema.org), naprawę błędów indeksacji, optymalizację sitemap i robots.txt oraz dostosowanie do mobile-first indexing." },
];

export default function SeoClientPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Parallax Hero (identical pattern to AboutPageClient / ServicesPageClient)
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
    <div className="bg-background text-white selection:bg-primary/30 selection:text-white overflow-hidden">
      
      {/* ═══════════════════════════════════════════════
          INNOVATIVE PARALLAX HERO (matching /uslugi & /o-nas)
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="SEO Analytics Background"
            fill
            className="object-cover opacity-30 select-none grayscale mix-blend-luminosity brightness-150 contrast-125"
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
            Pozycjonowanie SEO
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
              ZDOMINUJ
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[12vw] sm:text-[14vw] md:text-[10vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              GOOGLE<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Podejście data-driven. Skalowalne strategie SEO, które podnoszą widoczność, przyciągają ruch jakościowy i zamieniają wyszukiwania w klientów.
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
          CZYM JEST SEO — Sticky Layout (matching /o-nas & /uslugi)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                  Czym jest SEO
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Pozycjonowanie,<br/> które <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">dowozi.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  SEO to nie magia — to systematyczny, oparty na danych proces, który wynosi Twoją stronę na szczyt wyników Google i zamienia ruch organiczny w realny przychód.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none select-none">01</div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Dlaczego SEO?</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Fundament cyfrowego wzrostu</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  W erze cyfrowej, <strong className="text-white/80">93% wszystkich doświadczeń online zaczyna się od wyszukiwarki</strong>. Jeśli Twoja strona nie pojawia się na pierwszej stronie Google, po prostu nie istniejesz dla potencjalnych klientów. SEO to jedyny kanał marketingowy, który generuje ruch <strong className="text-white/80">24/7 bez opłat za kliknięcie</strong>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none select-none">02</div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Nasze podejście</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Data-driven SEO</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Nie działamy w ciemno. Każda nasza decyzja oparta jest na <strong className="text-white/80">twardych danych z Google Search Console, Ahrefs i narzędzi analitycznych</strong>. Analizujemy Twoją branżę, mapujemy intencje wyszukiwania użytkowników i budujemy strategię, która celuje w frazy z najwyższym potencjałem konwersji.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none select-none">03</div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Efekty, nie obietnice</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Transparentne wyniki</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Dostajesz <strong className="text-white/80">comiesięczne raporty z konkretnymi metrykami</strong>: wzrost pozycji fraz, ruch organiczny, nowe linki, współczynnik konwersji. Żadnych ogólników — twarde liczby i jasne rekomendacje kolejnych kroków.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS BAND
      ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-5xl md:text-6xl font-heading font-black text-white mb-3 tabular-nums drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="h-1 w-12 bg-primary/30 rounded-full mb-3 mx-auto md:mx-0" />
                <p className="text-white/40 text-sm md:text-base tracking-wide font-medium uppercase font-sans">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CO OBEJMUJE USŁUGA — Features Grid
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row gap-8 items-end justify-between"
          >
            <div>
              <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
                Zakres Usługi
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight">
                Co obejmuje <span className="text-white/30 italic font-light">nasze SEO</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg max-w-sm md:mx-0 mx-auto text-left">
              Kompleksowe podejście — od analizy technicznej, przez tworzenie treści, po budowę autorytetu domeny.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <feature.icon className="w-6 h-6 text-white/70 group-hover:text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 relative z-10 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROCESS (Sticky Story — matching /o-nas)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-40"
            >
              <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                Jak pracujemy
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-[1.1] mb-8">
                Proces, który <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                  gwarantuje wyniki
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                Sprawdzony 3-etapowy proces pozycjonowania. Każdy krok oparty na danych, eliminujący domysły i zapewniający mierzalny wzrost.
              </p>
              
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-4 text-white font-medium text-lg hover:text-primary transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:text-primary" />
                </div>
                Darmowa konsultacja
              </Link>
            </motion.div>

            <div className="flex flex-col gap-8 md:gap-12 lg:pt-12 mt-8 lg:mt-0">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-500"
                >
                  <div className="absolute top-8 right-8 text-6xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">
                    0{idx + 1}
                  </div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <step.icon className="w-6 h-6 text-white/70 group-hover:text-primary" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white mb-4 relative z-10 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-lg leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════ */}
      <section id="oferta" className="py-24 md:py-32 relative border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Pakiety SEO
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Cennik.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* BASIC */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">01</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">Basic</span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">875</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
                <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">/ mies.</span>
              </div>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Monitorowanie fraz: <strong className="text-white">100</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Linki miesięcznie: <strong className="text-white">5</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Treści (2500zzs): <strong className="text-white">6</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Znaków miesięcznie: <strong className="text-white">15 000</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Zmiana fraz / GSC / Raporty</li>
                <li className="flex items-start gap-3 text-white/20"><X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" /> <span className="line-through">Umowa na czas nieokreślony</span></li>
              </ul>

              <Link href="/kontakt" className="group/btn inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                Wybierz pakiet
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* OPTIMA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-primary/[0.05] select-none">02</div>
              <div className="absolute right-0 bottom-0 opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-500 bg-primary w-64 h-64 rounded-full" />
              
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold tracking-wider uppercase text-primary w-fit">Optima</span>
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">Popularne</span>
              </div>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">1399</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
                <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">/ mies.</span>
              </div>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Monitorowanie fraz: <strong className="text-white">250</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Linki miesięcznie: <strong className="text-white">10</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Treści (2500zzs): <strong className="text-white">10</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Znaków miesięcznie: <strong className="text-white">25 000</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Zmiana fraz / GSC / Raporty</li>
                <li className="flex items-start gap-3 text-white/20"><X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" /> <span className="line-through">Umowa na czas nieokreślony</span></li>
              </ul>

              <Link href="/kontakt" className="group/btn relative inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Wybierz pakiet
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* PRO */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">03</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">Pro</span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">1899</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
                <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">/ mies.</span>
              </div>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Monitorowanie fraz: <strong className="text-white">350</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Linki miesięcznie: <strong className="text-white">15</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Treści (2500zzs): <strong className="text-white">15</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Znaków miesięcznie: <strong className="text-white">37 500</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Zmiana fraz / GSC / Raporty</li>
                <li className="flex items-start gap-3 text-primary"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span className="font-bold">Umowa na czas nieokreślony</span></li>
              </ul>

              <Link href="/kontakt" className="group/btn inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                Wybierz pakiet
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
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
            <span className="text-white/40 text-sm tracking-widest uppercase">Częste pytania o SEO</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </motion.div>

           <div className="flex flex-col">
              {faqsData.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: idx * 0.08 }}
                     className="border-b border-white/5"
                  >
                     <button
                       onClick={() => setOpenFaq(isOpen ? null : idx)}
                       className="w-full flex items-center justify-between py-6 text-left group"
                     >
                        <span className={`font-heading font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? "text-primary" : "text-white group-hover:text-white/80"}`}>{faq.q}</span>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-colors duration-300 ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-white/10 group-hover:border-primary/30 group-hover:bg-white/5'}`}>
                           {isOpen ? (
                             <Plus className="w-4 h-4 text-primary rotate-45" />
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
              })}
           </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <HomeContactForm />

      {/* LOCAL REACH SECTION */}
      <LocalReachSection serviceName="Pozycjonowanie SEO" baseSlug="pozycjonowanie-seo" />

      {/* ═══════════════════════════════════════════════
          MEGA CTA (matching /o-nas)
      ═══════════════════════════════════════════════ */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
              Gotowy na <span className="text-primary italic font-light">top 10?</span>
            </h2>
            <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Umówmy się na bezpłatną konsultację i przeanalizujmy potencjał wzrostu Twojego serwisu w wyszukiwarkach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Darmowy audyt SEO
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
