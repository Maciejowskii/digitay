"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Check, X, Target, TrendingUp, BarChart, Settings, Eye, Zap, Users, Repeat, Image as ImageIcon, Video, MessageCircle, Share2, Layers } from "lucide-react";
import Link from "next/link";
import LocalReachSection from "@/components/LocalReachSection";
import HomeContactForm from "@/components/HomeContactForm";

// --- Data ---
const serviceFeatures = [
  { icon: Settings, title: "Setup & Tracking", desc: "Konfiguracja Meta Pixel i Conversions API. Precyzyjne śledzenie zdarzeń dla maksymalnej skuteczności algorytmu." },
  { icon: Target, title: "Targetowanie Lokalne", desc: "Docieramy do mieszkańców regionu. Wykorzystujemy zaawansowane opcje geolokalizacji i zainteresowań." },
  { icon: ImageIcon, title: "Kreacje Reklamowe", desc: "Projektujemy grafiki i wideo, które zatrzymują scroll. Dopasowujemy przekaz do odbiorcy lokalnego." },
  { icon: Users, title: "Budowa Społeczności", desc: "Zwiększamy zasięgi Twojej marki w regionie. Budujemy zaufanie i rozpoznawalność wśród Twoich sąsiadów." },
  { icon: Repeat, title: "Remarketing", desc: "Przypominamy o Twojej ofercie osobom, które widziały już Twoje reklamy lub były na stronie, zwiększając szansę na konwersję." },
  { icon: BarChart, title: "Analityka Wyników", desc: "Transparentne raporty z mierzalnymi efektami. Wiesz dokładnie, ile kosztował każdy lead i jaka jest rentowność kampanii." },
];

const processSteps = [
  { num: "01", title: "Audyt & Strategia", desc: "Analizujemy Twoją obecną obecność w social media i potencjał rynku. Tworzymy plan kampanii.", icon: Target },
  { num: "02", title: "Setup & Kreacja", desc: "Przygotowujemy techniczne zaplecze i projektujemy materiały reklamowe, które Cię wyróżnią.", icon: Settings },
  { num: "03", title: "Uruchomienie & Testy", desc: "Startujemy z kampanią. Testujemy różne formaty i grupy odbiorców, aby znaleźć najbardziej zyskowny model.", icon: TrendingUp },
  { num: "04", title: "Skalowanie", desc: "Zwiększamy budżety na najlepsze reklamy, aby zmaksymalizować Twoje zyski.", icon: BarChart },
];

const stats = [
  { value: "X.X", label: "Średni zwrot (ROAS)" },
  { value: "50%+", label: "Tańszy lead niż u konkurencji" },
  { value: "24/7", label: "Twoja marka widoczna stale" },
  { value: "100%", label: "Własność Twoich danych" },
];

const faqsData = [
  { q: "Czy Facebook Ads działa dla firm lokalnych?", a: "Zdecydowanie tak. Dzięki precyzyjnemu targetowaniu na Twój rejon i okolicę, Twoje reklamy trafiają tylko do osób, które mogą realnie skorzystać z Twoich usług." },
  { q: "Jaki budżet muszę przeznaczyć na reklamy?", a: "Dla kampanii lokalnych budżety mogą być mniejsze niż ogólnopolskie, ale rekomendujemy kwoty pozwalające na efektywne testowanie kreacji." },
  { q: "Czy muszę mieć dużo fanów na profilu?", a: "Nie, reklamy Facebook Ads działają niezależnie od liczby fanów. Skupiamy się na docieraniu do nowych osób zainteresowanych Twoją ofertą." },
  { q: "Jakie formaty reklam są najlepsze?", a: "To zależy od celu. Często najlepiej sprawdzają się wideo i karuzele, które angażują użytkownika i pokazują detale Twojej usługi." },
];

interface LocalFacebookAdsClientPageProps {
  city: {
    name: string;
    slug: string;
    inCity: string;
    fromCity: string;
  };
}

export default function LocalFacebookAdsClientPage({ city }: LocalFacebookAdsClientPageProps) {
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
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop"
            alt={`Reklamy Facebook ADS ${city.name}`}
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
            Meta ADS {city.name}
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
              SELLING {city.inCity.toUpperCase()}<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Kampanie na Facebooku i Instagramie, które zamieniają scroll mieszkańców {city.inCity} w realną sprzedaż. Budujemy zasięgi tam, gdzie bije serce Twojego lokalnego rynku.
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
          LOKALNE SOCIAL MEDIA — Sticky Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-12 mb-12">
               <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Twoja firma w social media <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">mieszkańców {city.inCity}.</span>
               </h2>
               <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-3xl">
                  Docieramy do ludzi dokładnie tam, gdzie spędzają swój wolny czas. Wykorzystujemy potencjał Facebooka i Instagrama, aby Twoja marka stała się pierwszym wyborem {city.inCity}.
               </p>
            </div>

            {serviceFeatures.map((f, i) => (
               <div key={i} className="lg:col-span-4 p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
                  <f.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
               </div>
            ))}
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
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Obsługa Meta Ads {city.name}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Cennik Reklam Social Media.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pakiety FB Ads */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col group hover:bg-white/[0.05] transition-all">
               <span className="text-xs uppercase tracking-widest text-white/40 mb-2">Social Starter</span>
               <div className="text-3xl font-heading font-black text-white mb-4">700 zł <span className="text-sm text-white/30">/ mies.</span></div>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Setup (Pixel/CAPI)</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> 1 kampania prospectingowa</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> 4 kreacje grafiki/wideo</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Raportowanie miesięczne</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full border border-white/10 text-center font-bold hover:bg-white/5 transition-all text-sm">Wybierz pakiet</Link>
            </div>
            
            <div className="p-8 rounded-3xl border border-primary/30 bg-primary/5 flex flex-col scale-105 shadow-2xl shadow-primary/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 bg-primary text-white text-[10px] font-bold uppercase tracking-tighter">Najczęściej wybierany</div>
               <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">Social Growth</span>
               <div className="text-3xl font-heading font-black text-white mb-4">1 200 zł <span className="text-sm text-white/30">/ mies.</span></div>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Wszystko w Starter</li>
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Remarketing dynamiczny</li>
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> 8 kreacji reklamowych</li>
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Spotkania strategiczne</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full bg-primary text-white text-center font-bold hover:bg-primary/90 transition-all text-sm">Wybierz pakiet</Link>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col group hover:bg-white/[0.05] transition-all">
               <span className="text-xs uppercase tracking-widest text-white/40 mb-2">Social Dominance</span>
               <div className="text-3xl font-heading font-black text-white mb-4">1 900 zł <span className="text-sm text-white/30">/ mies.</span></div>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Pełny lejek sprzedażowy</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> 12 kreacji reklamowych</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Raportowanie tygodniowe</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Wsparcie priorytetowe 8h</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full border border-white/10 text-center font-bold hover:bg-white/5 transition-all text-sm">Wybierz pakiet</Link>
            </div>
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
              Skuteczne reklamy na Facebooku <br/>
              <span className="text-primary">dla firm {city.fromCity}.</span>
            </h2>
            
            <p className="text-white/60 leading-relaxed mb-6">
              Zastanawiasz się, jak skutecznie dotrzeć do mieszkańców {city.inCity} ze swoją ofertą? <strong>Facebook i Instagram Ads</strong> to obecnie najpotężniejsze narzędzia do precyzyjnego budowania zasięgów lokalnych. W Digitay wiemy, jak przekuć potencjał social mediów w realne zamówienia i leady dla Twojej firmy {city.inCity}.
            </p>

            <p className="text-white/60 leading-relaxed mb-6">
              Profesjonalne prowadzenie <strong>kampanii na Facebooku {city.inCity}</strong> to nie tylko „promowanie postów”. To przemyślana strategia lejkowa, która najpierw edukuje lokalnego odbiorcę, buduje zaufanie do Twojej marki {city.inCity}, a na końcu domyka sprzedaż za pomocą precyzyjnego remarketingu. Dzięki Meta Pixel i Conversions API precyzyjnie mierzymy każdy grosz wydany na reklamę. 
            </p>

            <div className="my-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
               <h3 className="text-xl font-heading font-bold text-white mb-4 italic">Reklama, która buduje rewir</h3>
               <p className="text-white/50 text-sm md:text-base italic leading-relaxed">
                 „Nasza kampania skierowana do mieszkańców {city.inCity} sprawiła, że jesteśmy rozpoznawalni na każdym osiedlu. Social media stały się naszym głównym źródłem nowych klientów w regionie obsługiwanym przez naszą firmę.”
               </p>
            </div>

            <p className="text-white/60 leading-relaxed mb-6">
              Wyróżnij się w gąszczu informacji. Tworzymy kreacje (grafiki i wideo), które są dopasowane do specyfiki <strong>rynku lokalnego</strong>. Wykorzystujemy najnowsze formaty, takie jak Reels i Stories, aby Twój biznes wyglądał nowocześnie i profesjonalnie. Nasze działania są zawsze oparte na danych — testujemy różne grupy odbiorców, aby znaleźć te, które przynoszą najlepszy zwrot (ROAS).
            </p>

            <p className="text-white/60 leading-relaxed mb-12">
              Chcesz rozwinąć swoje social media {city.inCity}? Wybierz Digitay jako swojego partnera. Zapewniamy pełną obsługę: od strategii, przez kreację, po zaawansowaną analitykę. Skontaktuj się z nami i zobacz, jak Social Selling może zrewolucjonizować Twoją firmę {city.inCity}.
            </p>

            <Link href="/kontakt" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
               Porozmawiaj o reklamie {city.inCity}
               <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
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
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
            Pora na <br/> {city.inCity.toUpperCase()}<span className="text-primary italic font-light">.</span>
          </h2>
          <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Zmień swój Fanpage w maszynę do sprzedaży. Skaluj biznes w lokalnej społeczności.
          </p>
          <Link href="/kontakt" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] inline-flex items-center gap-3">
             Zacznij kampanię {city.inCity}
             <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
