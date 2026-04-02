"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Plus, Check, Palette, Code, Smartphone, Search, BarChart, Plug, ShieldCheck, Layers, PenTool, Zap } from "lucide-react";
import Link from "next/link";
import LocalReachSection from "@/components/LocalReachSection";

// --- Data ---
const serviceFeatures = [
  { icon: Palette, title: "UI/UX Design", desc: "Projektowanie interfejsów opartych na badaniach UX. Wireframes, prototypy i pixel-perfect designy, które konwertują odwiedzających w klientów." },
  { icon: Code, title: "Frontend Development", desc: "Budowa w React, Next.js i nowoczesnych technologiach. Czysty, wydajny kod, który ładuje się błyskawicznie i działa na każdym urządzeniu." },
  { icon: Smartphone, title: "Responsywność", desc: "Mobile-first development. Twoja strona wygląda perfekcyjnie na smartfonach, tabletach i desktopach — bez kompromisów." },
  { icon: Search, title: "SEO Techniczne", desc: "Optymalizacja pod wyszukiwarki od samego początku. Meta tagi, Schema.org, sitemap, Core Web Vitals i szybkość ładowania." },
  { icon: BarChart, title: "Analityka & Konwersje", desc: "Wdrożenie Google Analytics, zdarzeń konwersji, śledzenie formularzy, telefonów i maili. Mierzalne rezultaty od dnia pierwszego." },
  { icon: Plug, title: "Integracje", desc: "Połączenie z narzędziami: Make, Zapier, Facebook Ads, Google Ads, Google Tag Manager, CRM i dowolnymi API zewnętrznymi." },
  { icon: PenTool, title: "Copywriting", desc: "Profesjonalne treści sprzedażowe w ramach zakresu projektu. Nagłówki, opisy, CTA i sekcje domykające sprzedaż." },
  { icon: ShieldCheck, title: "Wsparcie po wdrożeniu", desc: "Nie zostawiamy Cię po launch'u. Wsparcie techniczne, poprawki i monitoring działania strony po uruchomieniu." },
];

const processSteps = [
  { num: "01", title: "Odkrywanie & Strategia", desc: "Poznajemy Twój biznes, cele i grupę docelową. Analizujemy konkurencję, definiujemy architekturę informacji i tworzymy szczegółowy plan projektu z kamieniami milowymi.", icon: Layers },
  { num: "02", title: "Design & Prototyp", desc: "Projektujemy wireframes i high-fidelity mockupy w Figma. Iterujemy na podstawie Twojego feedbacku, aż osiągniemy idealny wygląd i flow użytkownika. Nie kodujemy dopóki nie zatwierdzisz designu.", icon: Palette },
  { num: "03", title: "Development & Testy", desc: "Budujemy stronę w czystym, wydajnym kodzie (React/Next.js). Wdrażamy SEO techniczne, analitykę, integracje i testujemy na każdym urządzeniu i przeglądarce.", icon: Code },
  { num: "04", title: "Launch & Wsparcie", desc: "Wdrażamy stronę na produkcję, konfigurujemy domeny i SSL. Monitorujemy działanie, reagujemy na ewentualne problemy i dostarczamy wsparcie techniczne w ramach pakietu.", icon: Zap },
];

const stats = [
  { value: "50+", label: "Zrealizowanych projektów webowych" },
  { value: "<2s", label: "Średni czas ładowania naszych stron" },
  { value: "98%", label: "Zadowolonych klientów" },
  { value: "24h", label: "Czas odpowiedzi na zgłoszenie" },
];

const faqsData = [
  { q: "Ile trwa stworzenie strony internetowej?", a: "Typowy projekt trwa od 4 do 8 tygodni, w zależności od złożoności. Pakiet Basic to zazwyczaj 4-5 tygodni, Optima 5-7 tygodni, a Pro 6-10 tygodni. Czas zależy też od tempa dostarczania materiałów i feedbacku z Twojej strony." },
  { q: "Czy mogę samodzielnie edytować treści na stronie?", a: "Tak! Każda strona może być wyposażona w intuicyjny system zarządzania treścią (CMS), który pozwala Ci edytować teksty, zdjęcia i inne elementy bez znajomości programowania." },
  { q: "Czym różnią się pakiety?", a: "Główne różnice to liczba podstron (5/7/20), zaawansowanie sekcji sprzedażowych (formularze vs CTA + sekcje domykające), głębokość SEO i analityki, liczba rund poprawek (2/3/5) oraz długość wsparcia po wdrożeniu (brak/30/90 dni)." },
  { q: "Czy strona będzie zoptymalizowana pod SEO?", a: "Tak, każdy pakiet zawiera podstawowe SEO techniczne. Pakiety Optima i Pro additionally obejmują pełną optymalizację wydajności, zaawansowane Schema.org i audyt Core Web Vitals." },
  { q: "Co zawiera wsparcie po wdrożeniu?", a: "Wsparcie obejmuje naprawę ewentualnych błędów, drobne zmiany w treściach i konsultacje techniczne. W pakiecie Optima trwa 30 dni, w Pro — 90 dni. Pakiet Basic oferuje wsparcie w ramach rund poprawek." },
  { q: "Czy pomagacie z hostingiem i domeną?", a: "Tak, pomagamy w konfiguracji hostingu, domeny, certyfikatu SSL i wszystkich aspektów technicznych uruchomienia strony. Możemy też zarządzać infrastrukturą w ramach długoterminowej współpracy." },
];

interface LocalWebDevClientPageProps {
  city: {
    name: string;
    slug: string;
    inCity: string;
  };
}

export default function LocalWebDevClientPage({ city }: LocalWebDevClientPageProps) {
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
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop"
            alt={`Tworzenie stron internetowych ${city.name}`}
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
            Tworzenie Stron {city.name}
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
              BUDUJEMY
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[10vw] drop-shadow-2xl pr-4 pb-4"
            >
              INTERNET {city.inCity.toUpperCase()}<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Nowoczesne strony internetowe dla firm {city.inCity}. Budujemy platformy cyfrowe, które nie tylko wyglądają premium — ale przede wszystkim konwertują i skalują Twój biznes lokalny i ogólnopolski.
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
                  Lokalna Przewaga {city.name}
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Strony, które podbijają <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">rynek {city.name}.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  Digitay to wsparcie technologiczne dla biznesów {city.inCity}. Łączymy nowoczesny design z głęboką optymalizacją pod lokalne wyszukiwania.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Lokalne SEO & Widoczność</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Dominuj {city.inCity}</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Twoja nowa strona jest projektowana z myślą o <strong className="text-white/80">lokalnych frazach kluczowych</strong>. Optymalizujemy architekturę pod kątem użytkowników {city.inCity}, dbając o szybkość ładowania i pełną integrację z wizytówką Google Maps.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Design Premium & Autentyczność</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Wyróżnij się {city.inCity}</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  {city.name} to rynek, który wymaga najwyższej jakości. Tworzymy <strong className="text-white/80">unikalne projekty graficzne</strong>, które budują zaufanie i autorytet Twojej marki w regionie. Żadnych gotowych szablonów — tylko customowy design.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Pełne Wsparcie Techniczne</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Partner cyfrowy {city.inCity}</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Dla nas współpraca nie kończy się na publikacji strony. Zapewniamy <strong className="text-white/80">monitoring, aktualizacje i pomoc</strong> przy skalowaniu Twoich kampanii Google/FB Ads na rynku {city.name} i nie tylko.
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
          PROCESS GRID
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
          <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
            Tak pracujemy
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-6">
            Proces dający <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">rezultat.</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
              <div className="text-primary font-heading font-black text-2xl mb-4">{step.num}</div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12">Najczęstsze pytania o strony {city.inCity}</h2>
           <div className="flex flex-col">
              {faqsData.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-b border-white/5">
                     <button
                       onClick={() => setOpenFaq(isOpen ? null : idx)}
                       className="w-full flex items-center justify-between py-6 text-left group"
                     >
                        <span className={`font-heading font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? "text-primary" : "text-white group-hover:text-white/80"}`}>{faq.q}</span>
                        <Plus className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-45 text-primary' : 'text-white/40'}`} />
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
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* LOCAL REACH SECTION */}
      <LocalReachSection serviceName="Tworzenie Stron Internetowych" baseSlug="tworzenie-stron" />

      {/* CTA */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
            Zdominuj rynek {city.inCity}<span className="text-primary italic font-light">.</span>
          </h2>
          <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Stwórzmy stronę, która wyprzedzi konkurencję {city.inCity}. Skaluj swój biznes z Digitay.
          </p>
          <Link href="/kontakt" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] inline-flex items-center gap-3">
             Darmowa wycena dla firm {city.inCity}
             <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
