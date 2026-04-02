"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ArrowDown, 
  ArrowUpRight, 
  ArrowRight,
  Plus, 
  Check, 
  MapPin, 
  Search, 
  BarChart, 
  Settings, 
  Megaphone, 
  Target,
  MessageSquare,
  Globe,
  Navigation
} from "lucide-react";
import Link from "next/link";
import LocalReachSection from "@/components/LocalReachSection";
import HomeContactForm from "@/components/HomeContactForm";

// --- Data ---
const serviceFeatures = [
  { icon: MapPin, title: "Profil Firmy w Google", desc: "Kompletna konfiguracja i weryfikacja wizytówki. Optymalizacja pod kątem lokalnych algorytmów wyszukiwania." },
  { icon: Search, title: "Lokalne SEO", desc: "Pozycjonowanie na frazy powiązane z Twoją lokalizacją. Budowanie widoczności w Mapach Google i wynikach organicznych." },
  { icon: MessageSquare, title: "Zarządzanie Opiniami", desc: "Wdrożenie systemów zbierania recenzji i profesjonalna obsługa odpowiedzi. Budowanie zaufania u potencjalnych klientów." },
  { icon: Target, title: "Precyzyjne Atrybuty", desc: "Dobór odpowiednich kategorii, usług i produktów w profilu. Dopasowanie do realnych zapytań użytkowników." },
  { icon: Globe, title: "Spójność Wizytówek", desc: "Ujednolicenie danych NAP (nazwa, adres, telefon) w kluczowych katalogach i miejscach w sieci." },
  { icon: Navigation, title: "Wizytówka Bing", desc: "Obecność w mniej oczywistych, ale konwertujących wyszukiwarkach i systemach nawigacji." },
  { icon: Settings, title: "Optymalizacja Treści", desc: "Regularne wpisy, aktualizacje zdjęć i sekcji sprzedażowych. Utrzymywanie profilu w ciągłej aktywności." },
  { icon: BarChart, title: "Analityka Lokalna", desc: "Śledzenie liczby połączeń, zapytań o trasę i przejść na stronę. Wnioski oparte na realnych interakcjach." },
];

const processSteps = [
  { num: "01", title: "Audyt & Czyszczenie", desc: "Analizujemy obecny stan widoczności lokalnej. Usuwamy duplikaty, poprawiamy błędne dane i ustalamy strategię słów kluczowych.", icon: Search },
  { num: "02", title: "Optymalizacja & Setup", desc: "Wdrażamy techniczne zmiany w profilu Google. Konfigurujemy sekcje usług, menu i produkty. Przygotowujemy system opinii.", icon: Settings },
  { num: "03", title: "Aktywność & Treści", desc: "Rozpoczynamy regularne publikowanie wpisów lokalnych, dodajemy profesjonalne zdjęcia i budujemy bazę artykułów eksperckich.", icon: Megaphone },
  { num: "04", title: "Skalowanie & Raportowanie", desc: "Monitorujemy konkurencję, reagujemy na zmiany w algorytmach i systematycznie zwiększamy zasięgi. Co miesiąc dostarczamy raport.", icon: BarChart },
];

const stats = [
  { value: "90%+", label: "Ludzi szuka usług lokalnie" },
  { value: "3x", label: "Więcej połączeń z profilu" },
  { value: "24h", label: "Czas na pierwsze zmiany" },
  { value: "100%", label: "Własność Twoich kont" },
];

const faqsData = [
  { q: "Czy muszę mieć fizyczne biuro, aby korzystać z tej usługi?", a: "Tak, profil firmy w Google najlepiej sprawdza się dla firm posiadających fizyczną lokalizację lub świadczących usługi na określonym obszarze (np. hydraulik, dostawa). Pomożemy Ci przejść przez proces weryfikacji obszaru działalności." },
  { q: "Kiedy zobaczę wzrost w Mapach Google?", a: "Pierwsze efekty optymalizacji (poprawa danych, nowe zdjęcia) są widoczne niemal natychmiast. Widoczność rankingu na kluczowe frazy zazwyczaj poprawia się w ciągu 4-8 tygodni regularnych działań." },
  { q: "Czy zajmujecie się też usuwaniem negatywnych opinii?", a: "Nie usuwamy autentycznych opinii klientów (jest to niezgodne z polityką Google), ale pomagamy zgłaszać opinie fałszywe lub naruszające regulamin. Skupiamy się na pozyskiwaniu nowych, pozytywnych recenzji, które budują autorytet." },
  { q: "Czy potrzebuję strony internetowej?", a: "Wizytówka Google może działać samodzielnie, ale posiadanie zoptymalizowanej strony internetowej znacząco wzmacnia efekty pozycjonowania lokalnego. Pomożemy połączyć obie te przestrzenie." },
];

interface LocalMarketingLokalnyClientPageProps {
  city: {
    name: string;
    slug: string;
    inCity: string;
    fromCity: string;
  };
}

export default function LocalMarketingLokalnyClientPage({ city }: LocalMarketingLokalnyClientPageProps) {
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
            alt={`Marketing Lokalny ${city.name}`}
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
            Marketing Lokalny {city.name}
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
              DOMINACJA
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              {city.inCity.toUpperCase()}<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Bądź pierwszym wyborem w Twojej okolicy. Kompleksowe zarządzanie widocznością lokalną {city.inCity}, która zamienia kliknięcia w realne wizyty i telefony od lokalnych klientów.
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
          DLACZEGO WIDOCZNOŚĆ — Sticky Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                  Dlaczego widoczność {city.inCity}
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Klienci są<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">tuż obok.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  Większość decyzji zakupowych {city.inCity} zaczyna się od wpisania usługi w Google Maps. Jeśli Cię tam nie ma, konkurencja przejmuje Twoich klientów.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Zaufanie budowane opiniami</h3>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  <strong className="text-white/80">Recenzje to nowa waluta marketingu {city.inCity}</strong>. Pomagamy Ci nie tylko zbierać gwiazdki, ale budować system, który zachęca zadowolonych klientów do dzielenia się opinią i profesjonalnie odpowiada na każde zapytanie.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Wizytówka która sprzedaje</h3>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Twoja wizytówka to często pierwszy punkt styku z klientem {city.inCity}. <strong className="text-white/80">Optymalizujemy menu, produkty, zdjęcia i posty</strong> tak, aby prowadziły użytkownika bezpośrednio do kontaktu.
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
          PRICING
      ═══════════════════════════════════════════════ */}
      <section id="oferta" className="py-24 md:py-32 relative border-t border-white/5 bg-black/20 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Pakiety {city.name}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Cennik Marketingu Lokalnego.
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">Local Base</span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">399</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-4 block">/ mies.</span>
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Konfiguracja Profilu Google</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Ujednolicenie danych NAP</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Publikacje: 2 wpisy / mies.</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Podstawowa optymalizacja SEO</li>
              </ul>
              <Link href="/kontakt" className="group/btn inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                Wybierz pakiet
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* GROWTH */}
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
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold tracking-wider uppercase text-primary w-fit">Growth</span>
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">Popularne</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">499</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-4 block">/ mies.</span>
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <strong>Wszystko z Base</strong></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Obsługa opinii i recenzji</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Publikacje: 4 wpisy / mies.</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Analityka i raporty co miesiąc</li>
              </ul>
              <Link href="/kontakt" className="group/btn relative inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Wybierz pakiet
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* DOMINANCE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 p-8 md:p-10 flex flex-col"
            >
              <div className="absolute right-8 top-8 text-7xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">03</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-white/60 mb-6 w-fit">Dominance</span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-heading font-black text-white">699</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-4 block">/ mies.</span>
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <strong>Wszystko z Growth</strong></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Strategia reputacji i marki</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Wizytówka Bing i Apple Maps</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Pełna analityka konkurencji</li>
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
              Profesjonalny marketing lokalny <br/>
              <span className="text-primary">dla firm {city.fromCity}.</span>
            </h2>
            
            <p className="text-white/60 leading-relaxed mb-6">
              Zastanawiasz się, dlaczego Twoja konkurencja zawsze pojawia się wyżej w wynikach wyszukiwania Google Maps {city.inCity}? Odpowiedzią jest profesjonalny <strong>marketing lokalny</strong>. W Digitay specjalizujemy się w wyprowadzaniu lokalnych biznesów na szczyt wyników wyszukiwania, skupiając się na parametrach, które realnie przyciągają klientów z Twojej okolicy.
            </p>

            <p className="text-white/60 leading-relaxed mb-6">
              Skuteczne <strong>pozycjonowanie lokalne {city.inCity}</strong> to nie tylko kwestia ustawienia adresu. To wielowymiarowy proces, który obejmuje optymalizację Profilu Firmy w Google, budowanie spójności danych NAP (Name, Address, Phone) w sieci oraz aktywne zarządzanie opiniami. Wiemy, jak algorytmy Google oceniają trafność i odległość, i wykorzystujemy tę wiedzę, aby Twoja oferta była pierwszą, którą zobaczy potencjalny klient. 
            </p>

            <div className="my-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
               <h3 className="text-xl font-heading font-bold text-white mb-4 italic">Zaufanie buduje sprzedaż</h3>
               <p className="text-white/50 text-sm md:text-base italic leading-relaxed">
                 „Dzięki optymalizacji wizytówki przez zespół Digitay, liczba zapytań o dojazd do naszej siedziby {city.inCity} wzrosła o 150% w ciągu pierwszych trzech miesięcy współpracy.”
               </p>
            </div>

            <p className="text-white/60 leading-relaxed mb-6">
              Marketing w skali lokalnej wymaga precyzji. Każde miasto ma swoją specyfikę, dlatego nasze działania {city.inCity} są dopasowane do lokalnych trendów i zachowań użytkowników. Nie tylko poprawiamy widoczność, ale również dbamy o to, aby Twój profil wyglądał profesjonalnie i zachęcał do kontaktu poprzez regularne wpisy, aktualizacje zdjęć oraz precyzyjne opisy świadczonych usług.
            </p>

            <p className="text-white/60 leading-relaxed mb-12">
              Wybór Digitay jako partnera w <strong>marketingu lokalnym {city.inCity}</strong> to inwestycja w mierzalne wyniki. Monitorujemy każde kliknięcie, telefon i prośbę o trasę, dostarczając Ci jasnych danych o tym, jak nasza praca przekłada się na Twój biznes. Skontaktuj się z nami i zdominuj lokalny rynek już dziś.
            </p>

            <Link href="/kontakt" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
               Rozpocznij dominację {city.inCity}
               <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <HomeContactForm />

      {/* LOCAL REACH SECTION */}
      <LocalReachSection serviceName="Marketing Lokalny" baseSlug="marketing-lokalny" />

      {/* CTA */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
            Zdominuj rynek {city.inCity}<span className="text-primary italic font-light">.</span>
          </h2>
          <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Stań się liderem w swoim rewirze. Skaluj widoczność lokalną z Digitay.
          </p>
          <Link href="/kontakt" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] inline-flex items-center gap-3">
             Darmowy audyt dla firm {city.fromCity}
             <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
