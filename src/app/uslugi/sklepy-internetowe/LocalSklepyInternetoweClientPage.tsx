"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Check, X, ShoppingCart, CreditCard, Truck, Search, BarChart, Plug, PenTool, ShieldCheck, Layers, Tag, Filter, Package } from "lucide-react";
import Link from "next/link";
import LocalReachSection from "@/components/LocalReachSection";
import HomeContactForm from "@/components/HomeContactForm";

// --- Data ---
const serviceFeatures = [
  { icon: ShoppingCart, title: "Sklep Szyty na Miarę", desc: "Tworzymy zaawansowane platformy e-commerce. Intuicyjna ścieżka zakupu od koszyka po płatność, dopasowana do Twoich klientów." },
  { icon: Search, title: "SEO E-commerce", desc: "Optymalizacja pod frazy lokalne i ogólnopolskie. Budujemy widoczność Twoich produktów w Google." },
  { icon: CreditCard, title: "Płatności & Logistyka", desc: "Integracja z bramkami płatności i kurierami. Opcje odbioru osobistego dla lokalnych klientów." },
  { icon: BarChart, title: "Analityka Sprzedaży", desc: "Pełne śledzenie konwersji i zachowań użytkowników. Wiesz dokładnie, co kupują Twoi klienci." },
  { icon: Plug, title: "Automatyzacja", desc: "Synchronizacja z magazynem, Allegro i systemami ERP. Twój sklep pracuje automatycznie 24/7." },
  { icon: ShieldCheck, title: "Bezpieczeństwo", desc: "Certyfikaty SSL, bezpieczne płatności i zgodność z RODO. Budujemy zaufanie do Twojej marki online." },
];

const processSteps = [
  { num: "01", title: "Strategia & Plan", desc: "Analizujemy Twój asortyment i potencjał rynku. Planujemy strukturę kategorii i procesy zakupowe.", icon: Layers },
  { num: "02", title: "Design & UX", desc: "Projektujemy unikalny wygląd Twojego sklepu, dbając o to, by klienci kupowali z przyjemnością.", icon: Package },
  { num: "03", title: "Wdrożenie Sklepu", desc: "Budujemy platformę, integrujemy systemy i wprowadzamy pierwsze produkty. Testujemy wszystko przed startem.", icon: ShoppingCart },
  { num: "04", title: "Start & Skalowanie", desc: "Uruchamiamy Twój e-commerce. Monitorujemy wyniki i pomagamy Ci zwiększać sprzedaż miesiąc do miesiąca.", icon: BarChart },
];

const stats = [
  { value: "50+", label: "Wdrożonych e-commerce" },
  { value: "X.X%", label: "Wzrost konwersji (średnio)" },
  { value: "24/7", label: "Twój sklep nigdy nie śpi" },
  { value: "100%", label: "Wsparcie techniczne" },
];

const faqsData = [
  { q: "Czy mogę sprzedawać tylko lokalnie?", a: "Absolutnie nie. Twój sklep internetowy to brama na całą Polskę i świat. Lokalna obecność to tylko punkt wyjścia do budowy silnej marki online." },
  { q: "Jakie płatności obsługuje sklep?", a: "Integrujemy wszystkie popularne metody: BLIK, szybkie przelewy (P24, PayU), karty płatnicze oraz płatności odroczone." },
  { q: "Czy otrzymam szkolenie z obsługi?", a: "Tak, po wdrożeniu sklepu przeprowadzamy pełne szkolenie. Nauczysz się dodawać produkty i zarządzać zamówieniami samodzielnie." },
  { q: "Ile czasu trwa budowa sklepu?", a: "To zależy od złożoności, ale zazwyczaj wdrożenie profesjonalnego sklepu e-commerce zajmuje od 4 do 8 tygodni." },
];

interface LocalEcommerceClientPageProps {
  city: {
    name: string;
    slug: string;
    inCity: string;
    fromCity: string;
  };
}

export default function LocalEcommerceClientPage({ city }: LocalEcommerceClientPageProps) {
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
            alt={`Sklepy Internetowe ${city.name}`}
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
            E-commerce {city.name}
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
            Profesjonalne sklepy internetowe dla firm {city.fromCity}. Budujemy platformy e-commerce, które zamieniają Twoje atuty w globalny sukces sprzedażowy.
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
          DLACZEGO NASZ E-COMMERCE — Sticky Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-12 mb-12">
               <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Sklep internetowy, który <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">podbiłby rynek.</span>
               </h2>
               <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-3xl">
                  Łączymy nowoczesny design z potężną technologią. Twój e-commerce {city.inCity} nie będzie kolejnym nudnym szablonem. To unikalna marka, która sprzedaje.
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
              Inwestycja w E-commerce {city.name}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Cennik Sklepów Internetowych.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pakiety Ecommerce */}
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col group hover:bg-white/[0.05] transition-all">
               <span className="text-xs uppercase tracking-widest text-white/40 mb-2">Commerce Basic</span>
               <div className="text-3xl font-heading font-black text-white mb-4">4 500 zł <span className="text-sm text-white/30">Jednorazowo</span></div>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Do 20 produktów</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Płatności BLIK/Szybki Przelew</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Integracja z kurierem (1)</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Panel administratora</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full border border-white/10 text-center font-bold hover:bg-white/5 transition-all text-sm">Wybierz pakiet</Link>
            </div>
            
            <div className="p-8 rounded-3xl border border-primary/30 bg-primary/5 flex flex-col scale-105 shadow-2xl shadow-primary/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 bg-primary text-white text-[10px] font-bold uppercase tracking-tighter">Najchętniej wybierany</div>
               <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">Commerce Pro</span>
               <div className="text-3xl font-heading font-black text-white mb-4">10 900 zł <span className="text-sm text-white/30">Jednorazowo</span></div>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Wszystko w Basic</li>
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Nielimitowane produkty</li>
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Zaawansowane filtry i UX</li>
                 <li className="flex items-center gap-2 text-white/60"><Check className="w-4 h-4 text-primary shrink-0" /> Remarketing i odzyskiwanie koszyka</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full bg-primary text-white text-center font-bold hover:bg-primary/90 transition-all text-sm">Wybierz pakiet</Link>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col group hover:bg-white/[0.05] transition-all">
               <span className="text-xs uppercase tracking-widest text-white/40 mb-2">Commerce Enterprise</span>
               <div className="text-3xl font-heading font-black text-white mb-4">20 900+ zł <span className="text-sm text-white/30">Jednorazowo</span></div>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Pełne integracje ERP/WMS</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Unikalny design e-commerce</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Wsparcie techniczne 24/7</li>
                 <li className="flex items-center gap-2 text-white/50"><Check className="w-4 h-4 text-primary shrink-0" /> Strategia wzrostu e-commerce</li>
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
              Budowa sklepów internetowych <br/>
              <span className="text-primary">dla firm {city.fromCity}.</span>
            </h2>
            
            <p className="text-white/60 leading-relaxed mb-6">
              Masz świetny produkt i chcesz zacząć sprzedawać go mieszkańcom {city.inCity} oraz całej Polski? Profesjonalny <strong>sklep internetowy</strong> to inwestycja, która otwiera przed Tobą nieograniczone możliwości wzrostu. W Digitay tworzymy e-commerce, które nie tylko ładnie wyglądają, ale przede wszystkim generują mierzalną sprzedaż.
            </p>

            <p className="text-white/60 leading-relaxed mb-6">
              Nasze podejście do <strong>projektowania sklepów internetowych {city.inCity}</strong> opiera się na doświadczeniu użytkownika (UX). Każdy element — od struktury kategorii, przez zaawansowane filtry produktów, aż po błyskawiczny proces płatności — jest zoptymalizowany pod kątem konwersji. Wykorzystujemy najnowsze technologie, by Twój sklep ładował się natychmiastowo na telefonach i komputerach. 
            </p>

            <div className="my-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
               <h3 className="text-xl font-heading font-bold text-white mb-4 italic">E-commerce bez granic</h3>
               <p className="text-white/50 text-sm md:text-base italic leading-relaxed">
                 „Dzięki nowemu sklepowi internetowemu nasza sprzedaż znacznie wzrosła, a klienci chwalą intuicyjność i szybkość zakupów. Lokalna obecność {city.inCity} była świetnym punktem startowym.”
               </p>
            </div>

            <p className="text-white/60 leading-relaxed mb-6">
              Wdrażamy <strong>sklepy internetowe</strong> w pełni zintegrowane z nowoczesnymi systemami płatności (BLIK, karty, odroczone płatności) oraz logistyki (InPost, kurierzy). Jeśli prowadzisz punkt stacjonarny {city.inCity}, skonfigurujemy opcję „odbioru osobistego”, co buduje zaufanie lokalnej społeczności i obniża koszty logistyczne.
            </p>

            <p className="text-white/60 leading-relaxed mb-12">
              Dlaczego warto nam zaufać? Bo nie zostawiamy Cię po starcie. Każdy <strong>sklep internetowy {city.inCity}</strong> budujemy z myślą o dalszym pozycjonowaniu i kampaniach reklamowych. Otrzymujesz od nas narzędzie gotowe do dominacji na rynku. Skontaktuj się z nami i dowiedz się, jak możemy przenieść Twoją sprzedaż na zupełnie nowy poziom.
            </p>

            <Link href="/kontakt" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
               Wyceń swój sklep internetowy {city.inCity}
               <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <HomeContactForm />

      {/* LOCAL REACH SECTION */}
      <LocalReachSection serviceName="Sklepy Internetowe" baseSlug="sklepy-internetowe" />

      {/* CTA */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
            Pora na <br/> TWÓJ SKLEP<span className="text-primary italic font-light">.</span>
          </h2>
          <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Zacznij sprzedawać {city.inCity} i całej Polsce. Twój e-commerce czeka na start.
          </p>
          <Link href="/kontakt" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] inline-flex items-center gap-3">
             Uruchom sklep {city.inCity}
             <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
