"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowUpRight, Plus, Check, X, Search, BarChart, Target, FileText, Link2, Settings, Eye, Globe, Gauge, Shield } from "lucide-react";
import Link from "next/link";
import LocalReachSection from "@/components/LocalReachSection";
import HomeContactForm from "@/components/HomeContactForm";

// --- Data ---
const processSteps = [
  { title: "Audyt & Strategia", desc: "Kompleksowa analiza techniczna Twojej strony. Przeprowadzamy dogłębny keyword research skupiony na rynku lokalnym, analizujemy konkurencję i tworzymy spersonalizowaną strategię wzrostu.", icon: Search },
  { title: "Optymalizacja On-Site", desc: "Wdrażamy zmiany techniczne, optymalizujemy treści pod wybrane frazy kluczowe i poprawiamy architekturę informacji serwisu. Dbamy o Core Web Vitals.", icon: Target },
  { title: "Link Building & Raportowanie", desc: "Budujemy silny, naturalny profil linków. Co miesiąc dostarczamy przejrzysty raport z postępów: pozycje fraz, ruch organiczny i konwersje.", icon: BarChart }
];

const serviceFeatures = [
  { icon: Search, title: "Audyt SEO", desc: "Pełna analiza techniczna strony pod kątem algorytmów Google." },
  { icon: FileText, title: "Content Marketing", desc: "Tworzenie wartościowych treści, które przyciągają ruch i budują autorytet." },
  { icon: Link2, title: "Link Building", desc: "Pozyskiwanie backlinków z tematycznych, wysoko ocenianych domen." },
  { icon: Settings, title: "Optymalizacja Techniczna", desc: "Poprawa szybkości ładowania i eliminacja błędów technicznych." },
  { icon: Eye, title: "Monitoring Pozycji", desc: "Codzienne śledzenie pozycji Twoich fraz kluczowych w Google." },
  { icon: Globe, title: "SEO Lokalne", desc: "Pozycjonowanie na frazy lokalne i budowa widoczności w mapach Google." },
  { icon: Gauge, title: "Analityka & Raportowanie", desc: "Comiesięczne raporty z kluczowymi metrykami wzrostu." },
  { icon: Shield, title: "Bezpieczeństwo", desc: "Działania zgodne z wytycznymi Google, ochrona przed penalizacją." },
];

const stats = [
  { value: "93%", label: "Ruchu online zaczyna się od wyszukiwarki" },
  { value: "75%", label: "Użytkowników zostaje na 1. stronie" },
  { value: "14.6%", label: "Średni współczynnik konwersji" },
  { value: "5.66x", label: "Wyższy ROI niż z innych kanałów" },
];

const faqsData = [
  { q: "Ile kosztuje pozycjonowanie w moim mieście?", a: "Koszt zależy od konkurencijności branży i wybranych fraz. Nasze pakiety zaczynają się od kwot abonamentowych, które obejmują audyt, optymalizację, copywriting i link building." },
  { q: "Kiedy zobaczę efekty pozycjonowania?", a: "Pierwsze zmiany w pozycjach są widoczne po 2-3 miesiącach, a realny wzrost ruchu po 4-6 miesiącach konsekwentnych działań." },
  { q: "Czy SEO lokalne jest ważne?", a: "Tak, dla firm usługowych to kluczowy kanał pozyskiwania klientów z okolicy. Optymalizacja wizytówki Google i fraz lokalnych pozwala wyprzedzić konkurencję." },
  { q: "Czy gwarantujecie 1. miejsce w Google?", a: "Nikt nie może zagwarantować 1. miejsca, ponieważ algorytm Google jest zmienny. Gwarantujemy profesjonalne działania zgodne z najlepszymi praktykami, które systematycznie podnoszą Twoją widoczność." },
];

interface LocalSEOClientPageProps {
  city: {
    name: string;
    slug: string;
    inCity: string;
    fromCity: string;
  };
}

export default function LocalSEOClientPage({ city }: LocalSEOClientPageProps) {
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt={`Pozycjonowanie SEO ${city.name}`}
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
            Pozycjonowanie SEO {city.name}
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
              ZDOMINUJ
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              GOOGLE {city.inCity.toUpperCase()}<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Twoja firma w TOP 10 Google {city.inCity}. Skalowalne strategie SEO oparte na danych, które podnoszą widoczność i zamieniają wyszukiwania w realnych klientów z Twojego regionu.
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
          DLACZEGO SEO — Sticky Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-12 mb-12">
               <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Skuteczne pozycjonowanie {city.inCity}.
               </h2>
               <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-3xl">
                  Pomagamy firmom {city.inCity} wejść na szczyt wyników wyszukiwania. Łączymy zaawansowaną analitykę, optymalizację techniczną i link building, by Twoja strona pracowała na Twój sukces 24/7.
               </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceFeatures.map((feature, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                   <feature.icon className="w-8 h-8 text-primary mb-4" />
                   <h3 className="text-xl font-heading font-bold text-white mb-2">{feature.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
               <div className="p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                  <h3 className="text-2xl font-heading font-bold text-white mb-4">Liderzy {city.inCity}</h3>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    Nie pozwalaj konkurencji zajmować najlepszych miejsc w Google. Systematyczne działania SEO pozwolą Ci zbudować trwałą przewagę na rynku {city.inCity}.
                  </p>
                  <div className="flex flex-col gap-4">
                     {stats.map((s, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 text-sm uppercase tracking-widest">{s.label}</span>
                          <span className="text-primary font-heading font-black text-xl">{s.value}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════ */}
      <section id="oferta" className="py-24 md:py-32 relative border-t border-white/5 bg-black/20 z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Pakiety SEO {city.name}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Cennik Pozycjonowania.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SEO BASIC */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">01</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">SEO Basic</span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">875</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
                <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">/ mies.</span>
              </div>
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Monitorowanie fraz: 100</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Linki miesięcznie: 5</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Treści: 6 artykułów</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Raportowanie comiesięczne</li>
              </ul>
              <Link href="/kontakt" className="group/btn inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                Wybierz pakiet
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* SEO OPTIMA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-primary/[0.05] select-none">02</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold tracking-wider uppercase text-primary w-fit">SEO Optima</span>
              </div>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">1399</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
                <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">/ mies.</span>
              </div>
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Monitorowanie fraz: 250</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Linki miesięcznie: 10</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Treści: 10 artykułów</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Zaawansowane SEO techniczne</li>
              </ul>
              <Link href="/kontakt" className="group/btn relative inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Wybierz pakiet
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* SEO PRO */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">03</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">SEO Pro</span>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">1899</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
                <span className="text-xs text-white/30 mb-2 uppercase tracking-widest">/ mies.</span>
              </div>
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Monitorowanie fraz: 350+</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Linki miesięcznie: 15</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Treści: 15 artykułów</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Umowa na czas nieokreślony</li>
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
          CITY DETAILED DESCRIPTION (SEO)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background relative z-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white mb-8 leading-[1.1]">
              Skuteczne pozycjonowanie stron <br/>
              <span className="text-primary">dla firm {city.fromCity}.</span>
            </h2>
            
            <p className="text-white/60 leading-relaxed mb-6">
              Czy Twoja firma jest niewidoczna w Google, kiedy potencjalni klienci szukają Twoich usług {city.inCity}? Pora to zmienić. Profesjonalne <strong>pozycjonowanie SEO {city.inCity}</strong> to fundament nowoczesnego marketingu, który pozwala Ci docierać do osób realnie zainteresowanych Twoją ofertą w momencie, gdy jej szukają.
            </p>

            <p className="text-white/60 leading-relaxed mb-6">
              W Digitay do SEO podchodzimy kompleksowo i technologicznie. Nie skupiamy się tylko na prostych frazach kluczowych. Nasza strategia <strong>SEO dla firm {city.fromCity}</strong> obejmuje głęboki audyt techniczny, optymalizację Core Web Vitals, wdrożenie Schema.org oraz budowę wartościowej bazy treści (Content Marketing). Dzięki temu Twoja strona nie tylko pnie się w górę, ale staje się autorytetem w oczach algorytmów wyszukiwarki. 
            </p>

            <div className="my-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
               <h3 className="text-xl font-heading font-bold text-white mb-4 italic">Mierzalne wzrosty</h3>
               <p className="text-white/50 text-sm md:text-base italic leading-relaxed">
                 „Dzięki współpracy z Digitay {city.inCity}, nasz ruch organiczny wzrósł o 200%, a koszt pozyskania leada spadł trzykrotnie w porównaniu do płatnych kampanii.”
               </p>
            </div>

            <p className="text-white/60 leading-relaxed mb-6">
              Specyfika rynku lokalnego {city.inCity} wymaga unikalnego podejścia. Wykorzystujemy <strong>SEO lokalne</strong>, abyś dominował w tzw. 'local packu' oraz wynikach organicznych na frazy powiązane z Twoim regionem. Budujemy silny profil linków z lokalnych i tematycznych źródeł, co przekłada się na stabilny i długofalowy wzrost widoczności.
            </p>

            <p className="text-white/60 leading-relaxed mb-12">
              Dlaczego warto powierzyć <strong>SEO {city.inCity}</strong> właśnie nam? Ponieważ stawiamy na pełną transparentność. Co miesiąc otrzymujesz od nas jasny raport z postępów, analizę ruchu i konkretne plany na przyszłość. Naszym celem jest Twój zwrot z inwestycji (ROI). Skontaktuj się z nami i dowiedz się, jak możemy rozwinąć Twój biznes dzięki potędze darmowego ruchu z Google.
            </p>

            <Link href="/kontakt" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
               Bezpłatny audyt SEO {city.inCity}
               <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <HomeContactForm />

      {/* LOCAL REACH SECTION */}
      <LocalReachSection serviceName="Pozycjonowanie SEO" baseSlug="pozycjonowanie-seo" />

      {/* CTA */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
            Pora na TOP 1 <br/> {city.inCity.toUpperCase()}<span className="text-primary italic font-light">.</span>
          </h2>
          <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Zacznij generować ruch, który nie znika po wyłączeniu budżetu reklamowego.
          </p>
          <Link href="/kontakt" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] inline-flex items-center gap-3">
             Sprawdź potencjał SEO {city.name}
             <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
