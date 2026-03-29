"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Plus, Check, X, ShoppingCart, CreditCard, Truck, Search, BarChart, Plug, PenTool, ShieldCheck, Layers, Tag, Filter, Package } from "lucide-react";
import Link from "next/link";

// --- Data ---
const serviceFeatures = [
  { icon: ShoppingCart, title: "Konfiguracja Sklepu", desc: "Pełna konfiguracja platformy e-commerce — produkty, warianty, stany magazynowe, atrybuty i kategorie gotowe do sprzedaży od pierwszego dnia." },
  { icon: CreditCard, title: "Płatności Online", desc: "Integracja z popularnymi bramkami płatności (Stripe, Przelewy24, PayU, BLIK). Bezpieczne, szybkie transakcje zwiększające konwersję." },
  { icon: Truck, title: "Dostawy & Logistyka", desc: "Konfiguracja metod dostawy, śledzenie przesyłek i automatyczne powiadomienia. Integracja z kurierami i punktami odbioru." },
  { icon: Filter, title: "Architektura & Filtry", desc: "Logiczna struktura kategorii, podkategorii i kolekcji z zaawansowanymi filtrami produktów. UX, który prowadzi do zakupu." },
  { icon: Tag, title: "Karty Produktów", desc: "Karty produktów zoptymalizowane pod konwersję — sekcje zaufania, dowody społeczne, FAQ produktowe i cross-selling." },
  { icon: Search, title: "SEO E-commerce", desc: "Optymalizacja techniczna pod wyszukiwarki: meta dane produktów, Schema.org, Core Web Vitals i przyjazne URL-e kategorii." },
  { icon: BarChart, title: "Analityka E-commerce", desc: "Pełne śledzenie ścieżki zakupowej — zdarzenia GA4/GTM, raportowanie porzuceń koszyka, konwersji i wartości zamówień." },
  { icon: Plug, title: "Integracje & Automaty", desc: "Pixel Meta/Google, automaty porzuconych koszyków, integracje z Make/Zapier, CRM/ERP i systemami reklamowymi." },
];

const processSteps = [
  { num: "01", title: "Brief & Architektura", desc: "Poznajemy Twój asortyment, model biznesowy i grupę docelową. Definiujemy architekturę sklepu — kategorie, filtry, ścieżkę zakupową i integracje z płatnościami oraz dostawami.", icon: Layers },
  { num: "02", title: "Design & UX Sklepu", desc: "Projektujemy interfejs sklepu w Figma — listing produktów, karty produktowe, koszyk, checkout. Każdy element jest zoptymalizowany pod konwersję i minimalizację porzuceń koszyka.", icon: Package },
  { num: "03", title: "Development & Integracje", desc: "Budujemy sklep, konfigurujemy produkty i warianty, integrujemy płatności, dostawy i narzędzia analityczne. Testujemy cały flow zakupowy na każdym urządzeniu.", icon: ShoppingCart },
  { num: "04", title: "Launch & Optymalizacja", desc: "Wdrażamy sklep na produkcję, konfigurujemy tracking e-commerce i automaty marketingowe. Monitorujemy pierwsze zamówienia i optymalizujemy ścieżkę konwersji.", icon: BarChart },
];

const stats = [
  { value: "50+", label: "Wdrożonych sklepów e-commerce" },
  { value: "3.2x", label: "Średni wzrost konwersji po rebuildzie" },
  { value: "<3s", label: "Czas ładowania sklepu" },
  { value: "99.9%", label: "Uptime naszych wdrożeń" },
];

const faqsData = [
  { q: "Na jakiej platformie budujecie sklepy?", a: "Pracujemy z najnowszymi technologiami — Next.js z headless CMS/commerce (Shopify, WooCommerce, Medusa.js) w zależności od potrzeb projektu. Dobieramy rozwiązanie, które najlepiej pasuje do skali i modelu Twojego biznesu." },
  { q: "Ile trwa wdrożenie sklepu internetowego?", a: "Pakiet Basic to ok. 4-6 tygodni, Optima 6-8 tygodni, a Pro 8-12 tygodni. Czas zależy od liczby produktów, złożoności integracji i tempa dostarczania materiałów." },
  { q: "Czy mogę sam zarządzać produktami?", a: "Tak! Każdy sklep ma intuicyjny panel administracyjny, w którym samodzielnie dodasz produkty, zmienisz ceny, zarządzisz stanami magazynowymi i przetworzysz zamówienia — bez wiedzy technicznej." },
  { q: "Jakie metody płatności i dostawy obsługujecie?", a: "Integrujemy wszystkie popularne bramki (Przelewy24, PayU, Stripe, BLIK) oraz kurierów (InPost, DPD, DHL, Poczta Polska). W pakietach wyższych konfigurujemy też automaty porzuconych koszyków." },
  { q: "Czy sklep będzie zoptymalizowany pod SEO?", a: "Tak — każdy pakiet zawiera podstawowe SEO techniczne. Pakiety Optima i Pro obejmują zaawansowaną optymalizację Core Web Vitals, Schema.org dla produktów i przyjazne URL-e." },
  { q: "Co obejmuje wsparcie po starcie?", a: "Wsparcie obejmuje naprawę błędów, drobne korekty i konsultacje techniczne. Basic: 14 dni, Optima: 45 dni, Pro: 180 dni. Po tym okresie oferujemy opcjonalną umowę serwisową." },
];

export default function EcommerceClientPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop"
            alt="E-commerce Background"
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
            Sklepy Internetowe
            <span className="w-8 md:w-16 h-[1px] bg-primary/50" />
          </motion.div>

          <motion.h1
            style={{ scale: textScale, opacity: textOpacity }}
            className="flex flex-col items-center justify-center text-center font-heading font-black origin-center"
          >
            <motion.span
              style={{ x: textLeftX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block drop-shadow-2xl"
            >
              SPRZEDAWAJ
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              ONLINE<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Sklepy internetowe, które nie są „kolejnym WooCommerce". Budujemy e-commerce zoptymalizowany pod konwersję, szybkość i skalowanie Twojego biznesu.
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
          CZYM SIĘ WYRÓŻNIAMY — Sticky Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                  Dlaczego z nami
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  E-commerce,<br/> który <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">sprzedaje.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  Nie stawiamy „sklepów". Budujemy maszyny sprzedażowe — od karty produktu po checkout, każdy element jest zaprojektowany tak, by generować zamówienia.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Konwersja ponad wszystko</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Każdy piksel sprzedaje</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Karty produktów z sekcjami <strong className="text-white/80">social proof, FAQ, cross-selling i urgency</strong>. Checkout zoptymalizowany pod minimalizację porzuceń. Automaty odzyskujące porzucone koszyki. Każdy element ścieżki zakupowej jest przemyślany.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Szybkość = pieniądze</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Performance-first</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Każda sekunda ładowania kosztuje Cię <strong className="text-white/80">7% konwersji</strong>. Nasze sklepy ładują się w mniej niż 3 sekundy nawet z setkami produktów. Optymalizujemy obrazy, cache, lazy loading i Core Web Vitals.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Gotowy do skalowania</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Od startupu po enterprise</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Integracje z <strong className="text-white/80">Make, Zapier, CRM/ERP, systemami reklamowymi i fulfillment</strong>. Architektura, która nie trzeszczy przy 10 000 produktów. Sklep, który rośnie razem z Twoim biznesem.
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
          CO OBEJMUJE — Features Grid
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
                Co dostajesz <span className="text-white/30 italic font-light">w sklepie</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg max-w-sm md:mx-0 mx-auto text-left">
              Od konfiguracji produktów po automaty e-mail — kompletny e-commerce pod klucz.
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
          PROCESS (Compact Timeline)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Zza kulis
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-6">
              Od briefu do <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">pierwszego zamówienia</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Sprawdzony 4-etapowy proces wdrożenia sklepu. Bez niespodzianek i z przewidywalnym harmonogramem, krok po kroku.
            </p>
          </motion.div>

          {/* Timeline Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/[0.05]"
              >
                {/* Top highlight bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Watermark Number */}
                <div className="absolute right-6 top-6 text-6xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none select-none">
                  {step.num}
                </div>
                
                <div className="flex flex-col items-start text-left relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500 mb-6">
                    <step.icon className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
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
              Pakiety E-commerce
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
              className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">01</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">Basic</span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">4 500</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-8 block">Jednorazowo</span>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Liczba podstron: <strong className="text-white">5</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Produkty (do 20), warianty, atrybuty</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Płatności (1-2) + dostawy (1-2)</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Responsywność + optymalizacja szybkości</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Podstawowe SEO techniczne</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Analityka GA4 + podstawowe zdarzenia</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Rundy poprawek: <strong className="text-white">2</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Wsparcie po starcie: <strong className="text-white">14 dni</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Copy (nagłówki + sekcje sprzedażowe)</li>
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
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">10 900</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-8 block">Jednorazowo</span>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Liczba podstron: <strong className="text-white">10</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Architektura kategorii + filtry (UX)</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Karty produktów pod konwersję</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Płatności + dostawy + odzyskiwanie koszyka</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> SEO techniczne + Core Web Vitals</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Integracje: Pixel/Ads + automaty</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Rundy poprawek: <strong className="text-white">4</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Wsparcie po starcie: <strong className="text-white">45 dni</strong></span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Copywriting (kategorie + sekcje sprzedażowe)</li>
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
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">20 999</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-8 block">Jednorazowo</span>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Liczba podstron: <strong className="text-white">20</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Rozbudowana architektura + kolekcje</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Zaawansowane SEO + pełny audyt</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optymalizacja szybkości + rekomendacje</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Analityka e-commerce: GTM/GA4 pełne</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Integracje: Make/Zapier, CRM/ERP, Ads</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Rundy poprawek: <strong className="text-white">6</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Wsparcie po starcie: <strong className="text-white">180 dni</strong></span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Copy (kategorie + landing SEO + konwersja)</li>
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
            <span className="text-white/40 text-sm tracking-widest uppercase">Częste pytania o sklepy</span>
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

      {/* ═══════════════════════════════════════════════
          CTA
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
              Zacznij <span className="text-primary italic font-light">sprzedawać.</span>
            </h2>
            <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Porozmawiajmy o Twoim e-commerce. Darmowa wycena i konsultacja — bez zobowiązań.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Darmowa wycena sklepu
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
