"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Plus, Check, X, Target, TrendingUp, BarChart, Settings, Eye, Zap, Users, Repeat, Image as ImageIcon, Video, MessageCircle, Share2, Layers } from "lucide-react";
import Link from "next/link";
import HomeContactForm from "@/components/HomeContactForm";
import LocalReachSection from "@/components/LocalReachSection";

// --- Data ---
const serviceFeatures = [
  { icon: Settings, title: "Setup & Pixel/CAPI", desc: "Konfiguracja Business Managera, Meta Pixela i Conversions API. Poprawna atrybucja konwersji to fundament skutecznych kampanii." },
  { icon: Target, title: "Strategia & Targetowanie", desc: "Dobór celów kampanii, segmentacja odbiorców (zainteresowania, custom audiences, lookalike), harmonogram testów i plan skalowania." },
  { icon: ImageIcon, title: "Kreacje Reklamowe", desc: "Projektowanie grafik, karuzeli i wideo shortów zoptymalizowanych pod algorytm Meta. Iteracja na zwycięzcach i testowanie nowych formatów." },
  { icon: Users, title: "Testy Grup Odbiorców", desc: "Rozbudowane testy targetowania — zainteresowania, lookalike 1-5%, custom audiences z bazy klientów, retargeting odwiedzających stronę." },
  { icon: Repeat, title: "Remarketing", desc: "Dynamiczny remarketing do osób, które odwiedziły stronę, dodały do koszyka lub interagowały z profilem. Odzyskiwanie utraconego ruchu." },
  { icon: TrendingUp, title: "Optymalizacja", desc: "Regularna optymalizacja budżetów, stawek i kreacji. Praca na danych z Pixela i CAPI — eliminacja nierentownych zestawów reklam." },
  { icon: BarChart, title: "Raportowanie", desc: "Przejrzyste raporty z kluczowymi metrykami: CPM, CPC, CTR, CPA, ROAS. Wnioski i rekomendacje, nie tylko surowe dane." },
  { icon: Share2, title: "Skalowanie", desc: "Systematyczne zwiększanie budżetów na najlepsze zestawy. Strategia horizontal i vertical scaling oparta na danych z testów." },
];

const processSteps = [
  { num: "01", title: "Audyt & Strategia", desc: "Analizujemy Twój Business Manager, Pixel i dotychczasowe kampanie. Definiujemy grupy docelowe, cele reklamowe i tworzymy plan testów z harmonogramem kreacji.", icon: Target },
  { num: "02", title: "Setup & Kreacje", desc: "Konfigurujemy tracking (Pixel + CAPI), tworzymy strukturę kampanii i pierwsze zestawy kreacji — grafiki, karuzele, wideo. Uruchamiamy kampanie prospectingowe i remarketing.", icon: Settings },
  { num: "03", title: "Optymalizacja & Testy", desc: "Testujemy grupy odbiorców, kreacje i oferty. Analizujemy dane z Pixela, iterujemy na zwycięzcach i systematycznie obniżamy koszt pozyskania klienta.", icon: TrendingUp },
  { num: "04", title: "Skalowanie & Raportowanie", desc: "Zwiększamy budżety na najlepsze zestawy, raportujemy wyniki i rekomendujemy kolejne kroki. Regularne spotkania i bieżące wsparcie.", icon: BarChart },
];

const stats = [
  { value: "2.8x", label: "Średni ROAS kampanii Meta" },
  { value: "-38%", label: "Redukcja kosztu za lead" },
  { value: "150+", label: "Zarządzanych kampanii FB/IG" },
  { value: "24h", label: "Czas reakcji na anomalie" },
];

const faqsData = [
  { q: "Jaki budżet reklamowy potrzebuję na start?", a: "Rekomendujemy minimum 1 500-3 000 zł/mies. budżetu reklamowego (poza opłatą za zarządzanie). Optymalny budżet startowy pozwala algorytmowi Meta na efektywną naukę i wyjście z fazy uczenia w 3-7 dni." },
  { q: "Kiedy zobaczę pierwsze wyniki?", a: "Pierwsze dane pojawiają się od razu. Faza uczenia algorytmu trwa 3-7 dni per zestaw reklam (ok. 50 konwersji). Stabilne, powtarzalne wyniki widoczne są po 2-4 tygodniach testów i optymalizacji." },
  { q: "Czym różnią się pakiety?", a: "Główne różnice: liczba kampanii (1/2/3), kreacje (4/8/12 mies.), częstotliwość optymalizacji (1x/2x/3x tydz.), raportowanie (miesięczne/dwutygodniowe/tygodniowe), spotkania i SLA (Pro: odpowiedź do 8h)." },
  { q: "Czy tworzycie kreacje graficzne i wideo?", a: "Tak! W każdym pakiecie tworzymy kreacje reklamowe — grafiki statyczne, karuzele i wideo shorty. W pakiecie Pro dodatkowo assety dla formatów Reels i Stories. Możemy też pracować z Twoimi materiałami." },
  { q: "Czy zarządzacie też reklamami na Instagramie?", a: "Tak — kampanie Facebook Ads automatycznie obejmują też Instagram (Feed, Stories, Reels, Explore). Optymalizujemy umiejscowienia pod najlepsze wyniki na obu platformach." },
  { q: "Jak wygląda raportowanie?", a: "Basic: raport miesięczny, Optima: co 2 tygodnie + rekomendacje, Pro: raport tygodniowy z priorytetami. Śledzimy CPM, CPC, CTR, CPA, ROAS, częstotliwość i jakość leadów." },
];

export default function FacebookAdsClientPage() {
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
      
      {/* PARALLAX HERO */}
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
            src="/images/uslugi/meta_ads_hero_bg.png"
            alt="Facebook Ads Background"
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
            Meta / Facebook Ads
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
              SOCIAL
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              SELLING<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Kampanie na Facebooku i Instagramie, które zamieniają scroll w sprzedaż. Prospecting, remarketing i skalowanie — z pełną kontrolą nad ROAS.
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

      {/* STICKY LAYOUT */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                  Dlaczego Meta Ads
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Reklamy, które<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">konwertują.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  Facebook i Instagram to 3.5 miliarda aktywnych użytkowników. Docieramy do Twoich idealnych klientów z przekazem, który generuje leady i sprzedaż.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Precyzja algorytmu Meta</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Pixel + CAPI = pełna kontrola</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Poprawnie skonfigurowany <strong className="text-white/80">Meta Pixel i Conversions API</strong> to fundament. Dzięki dokładnej atrybucji algorytm uczy się szybciej, znajduje lepszych odbiorców i obniża koszt konwersji z każdym dniem.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Kreacje, które zatrzymują scroll</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Content is king</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Na Facebooku i Instagramie <strong className="text-white/80">kreacja to 80% sukcesu</strong>. Tworzymy grafiki, karuzele i wideo shorty, które przyciągają uwagę w pierwszej sekundzie. Iterujemy na zwycięzcach i systematycznie testujemy nowe formaty.
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
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 relative z-10">Full-funnel approach</h3>
                <span className="text-primary tracking-widest uppercase text-xs md:text-sm font-bold block mb-6 relative z-10">Prospecting → Remarketing → Konwersja</span>
                <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors relative z-10">
                  Budujemy <strong className="text-white/80">pełen lejek sprzedażowy</strong>: zimny ruch (lookalike i zainteresowania), ciepły remarketing (odwiedzający stronę, interakcje) i gorący retargeting (porzucone koszyki, formularze). Każdy etap ma dedykowany przekaz.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* FEATURES GRID */}
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
                Co robimy <span className="text-white/30 italic font-light">na Meta</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg max-w-sm md:mx-0 mx-auto text-left">
              Od konfiguracji Pixela po skalowanie kampanii — pełen zakres zarządzania reklamami Meta.
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

      {/* PROCESS */}
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
                Od audytu do <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                  stabilnego ROAS
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                4 etapy, które zamieniają budżet reklamowy w przewidywalny strumień leadów i sprzedaży z social media.
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
                  <div className="absolute top-8 right-8 text-6xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">{step.num}</div>
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <step.icon className="w-6 h-6 text-white/70 group-hover:text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4 relative z-10 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed relative z-10">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="oferta" className="py-24 md:py-32 relative border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Pakiety Facebook Ads
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
                <span className="text-5xl md:text-6xl font-heading font-black text-white">700</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-8 block">/ miesiąc</span>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Setup konta (BM/Pixel/CAPI)</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Strategia startowa + plan testów</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 1 kampania + remarketing</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Kreacje: <strong className="text-white">4/mies.</strong> (grafika/wideo)</span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optymalizacja stawek i budżetu 1x/tydz.</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Raport miesięczny (wyniki + wnioski)</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Rozbudowane testy grup odbiorców</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Cykliczne spotkania</li>
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
                <span className="text-5xl md:text-6xl font-heading font-black text-white">1 200</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-8 block">/ miesiąc</span>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Audyt kampanii / start od zera</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 2 kampanie (prospecting + remarketing)</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Do 4 zestawów reklam + testy odbiorców</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Kreacje: <strong className="text-white">8/mies.</strong> + iteracje</span></li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Dopracowanie konwersji i atrybucji</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optymalizacja 2x/tydz.</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Raport co 2 tygodnie + rekomendacje</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Spotkanie 1x/mies. (15-30 min)</li>
                <li className="flex items-start gap-3 text-white/60"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Rozbudowane testy grup odbiorców</li>
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
                <span className="text-5xl md:text-6xl font-heading font-black text-white">1 900</span>
                <span className="text-xl font-bold mb-1 text-white/40">zł</span>
              </div>
              <span className="text-xs text-white/30 uppercase tracking-widest mb-8 block">/ miesiąc</span>
               
              <ul className="space-y-3 mb-10 flex-grow text-sm">
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Pełna strategia skalowania + testy</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Do 3 kampanii + segmentacja</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Do 6 zestawów reklam + testy A/B</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Kreacje: <strong className="text-white">12/mies.</strong> + assety wideo</span></li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Optymalizacja 3x/tydz. + szybkie reakcje</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Raport tygodniowy + priorytety</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Spotkanie 2x/mies. + wsparcie bieżące</li>
                <li className="flex items-start gap-3 text-white/50"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Wykluczenia + kontrola jakości ruchu</li>
                <li className="flex items-start gap-3 text-primary"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span className="font-bold">SLA odpowiedzi do 8h</span></li>
              </ul>

              <Link href="/kontakt" className="group/btn inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all">
                Wybierz pakiet
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-primary font-heading font-bold text-sm tracking-widest">FAQ</span>
            <span className="text-white/40 text-sm tracking-widest uppercase">Częste pytania o Facebook Ads</span>
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
      <LocalReachSection serviceName="Reklamy Facebook ADS" baseSlug="reklamy-facebook-ads" />

      {/* CTA */}
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
              Zacznij <span className="text-primary italic font-light">docierać.</span>
            </h2>
            <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Porozmawiajmy o tym, jak kampanie Meta Ads mogą napędzić Twój biznes. Bezpłatna konsultacja — bez zobowiązań.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Darmowa konsultacja
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
