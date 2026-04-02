"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Check, Target, TrendingUp, BarChart, Settings, Eye, Zap, Users, FileText, MousePointerClick, DollarSign, Megaphone, LineChart } from "lucide-react";
import Link from "next/link";
import LocalReachSection from "@/components/LocalReachSection";
import HomeContactForm from "@/components/HomeContactForm";

// --- Data ---
const serviceFeatures = [
  { icon: Target, title: "Precyzyjne Targetowanie", desc: "Docieramy do klientów dokładnie w momencie, gdy szukają Twoich usług w Google. Wykorzystujemy geolokalizację, aby skupić się na Twoim rewirze." },
  { icon: TrendingUp, title: "Szybkie Efekty", desc: "W przeciwieństwie do SEO, Google Ads generuje ruch od pierwszej minuty po uruchomieniu kampanii. Idealne dla nowych ofert i promocji." },
  { icon: BarChart, title: "Mierzalny ROI", desc: "Znamy koszt każdego kliknięcia i każdego pozyskanego leada. Pełna transparentność wydatków i efektów." },
  { icon: Settings, title: "Optymalizacja Stała", desc: "Nieustannie testujemy nagłówki, treści reklam i strony lądowania, aby obniżać koszt konwersji." },
  { icon: Eye, title: "Remarketing", desc: "Przypominamy się osobom, które już odwiedziły Twoją stronę, ale nie dokonały zakupu — zwiększając szansę na domknięcie sprzedaży." },
  { icon: Zap, title: "Kampanie Performance Max", desc: "Wykorzystujemy AI od Google, aby automatycznie wyświetlać Twoje reklamy tam, gdzie przyniosą najlepszy zwrot." },
];

const processSteps = [
  { num: "01", title: "Analiza & Dobór Słów", desc: "Badamy, jakie frazy wpisują klienci w Twojej branży i lokalizacji. Wybieramy te o najwyższym potencjale sprzedażowym." },
  { num: "02", title: "Strategia & Teksty", desc: "Tworzymy perswazyjne teksty reklamowe i projektujemy ścieżkę konwersji na Twojej stronie." },
  { num: "03", title: "Uruchomienie & Testy", desc: "Kampania startuje. Monitorujemy pierwsze wyniki i błyskawicznie reagujemy, optymalizując stawki i wykluczając nietrafione zapytania." },
  { num: "04", title: "Skalowanie & Raport", desc: "Kiedy mamy już rentowną kampanię, zwiększamy zasięgi. Co miesiąc dostajesz przejrzysty raport z wynikami." },
];

const stats = [
  { value: "100%", label: "Mierzalność wyników" },
  { value: "<24h", label: "Czas na pierwsze efekty" },
  { value: "24/7", label: "Twoja oferta widoczna zawsze" },
  { value: "Xx", label: "Zwrot z inwestycji (ROAS)" },
];

const faqsData = [
  { q: "Ile muszę wydać na budżet reklamowy?", a: "To zależy od Twoich celów i konkurencyjności branży. Rekomendujemy budżet, który pozwoli na zebranie odpowiedniej ilości danych do optymalizacji. Płacisz tylko za kliknięcia osób realnie zainteresowanych." },
  { q: "Czy mogę sam prowadzić kampanię?", a: "Panel Google Ads jest dostępny dla wszystkich, ale bez doświadczenia łatwo przepalić budżet. Nasza wiedza pozwala na obniżenie kosztów kliknięcia i znaczące zwiększenie konwersji." },
  { q: "Kiedy pojawią się pierwsi klienci?", a: "Reklamy startują niemal natychmiast po akceptacji przez Google. Pierwsi klienci mogą pojawić się już w pierwszym dniu trwania kampanii." },
  { q: "Czym różni się Google Ads od SEO?", a: "SEO to budowa widoczności organicznej na lata (wymaga czasu). Google Ads to natychmiastowa obecność w TOP wyników płatnych, dopóki trwa budżet reklamowy." },
];

interface LocalGoogleAdsClientPageProps {
  city: {
    name: string;
    slug: string;
    inCity: string;
    fromCity: string;
  };
}

export default function LocalGoogleAdsClientPage({ city }: LocalGoogleAdsClientPageProps) {
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
            alt={`Kampanie Google ADS ${city.name}`}
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
            Google ADS {city.name}
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
              NATYCHMIASTOWE
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[11vw] sm:text-[13vw] md:text-[9vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              WYNIKI {city.inCity.toUpperCase()}<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Bądź na szczycie wyników wyszukiwania Google {city.inCity} już dziś. Profesjonalne kampanie Google Ads, które precyzyjnie docierają do Twoich klientów i generują realne zyski od pierwszej minuty.
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
          CZEGO SIĘ SPODZIEWAĆ — Sticky Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-40">
                <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                  Reklama {city.inCity}
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter leading-[1] mb-8">
                  Konwersje, nie <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic font-light">puste kliknięcia.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-md">
                  W Digitay skupiamy się na rentowności Twoich kampanii. Wykorzystujemy precyzyjne kierowanie na {city.name}, aby docierać do ludzi, którzy naprawdę szukają Twoich produktów we właściwym miejscu.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 pt-8 lg:pt-0">
               {serviceFeatures.map((f, i) => (
                 <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all"
                 >
                    <f.icon className="w-10 h-10 text-primary mb-6" />
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-white/50 leading-relaxed">{f.desc}</p>
                 </motion.div>
               ))}
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
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Obsługa Kampanii {city.name}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Cennik Google ADS.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col">
               <span className="text-xs uppercase tracking-widest text-white/40 mb-2">Basic</span>
               <div className="text-3xl font-heading font-black text-white mb-4">900 zł <span className="text-sm text-white/30">/ mies.</span></div>
               <p className="text-sm text-white/50 mb-6 font-medium">Budżet do 5 000 zł</p>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Setup kampanii</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 2 kampanie (Search / Display)</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Podstawowy landing page (opcja)</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Miesięczny raport</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full border border-white/10 text-center font-bold hover:bg-white/5 transition-all text-sm">Wybierz pakiet</Link>
            </div>
            
            <div className="p-8 rounded-3xl border border-primary/30 bg-primary/5 flex flex-col scale-105 shadow-2xl shadow-primary/10">
               <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">Growth</span>
               <div className="text-3xl font-heading font-black text-white mb-4">1 500 zł <span className="text-sm text-white/30">/ mies.</span></div>
               <p className="text-sm text-white/50 mb-6 font-medium">Budżet do 15 000 zł</p>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Setup + Audyt konta</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Nielimitowane kampanie</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Remarketing dynamiczny</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Optymalizacja konwersji</li>
               </ul>
               <Link href="/kontakt" className="w-full py-4 rounded-full bg-primary text-white text-center font-bold hover:bg-primary/90 transition-all text-sm">Wybierz pakiet</Link>
            </div>

            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col">
               <span className="text-xs uppercase tracking-widest text-white/40 mb-2">Pro</span>
               <div className="text-3xl font-heading font-black text-white mb-4">2 500+ zł <span className="text-sm text-white/30">/ mies.</span></div>
               <p className="text-sm text-white/50 mb-6 font-medium">Budżet pow. 15 000 zł</p>
               <ul className="space-y-3 mb-8 flex-grow text-sm">
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Dedykowany opiekun</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Pełny marketing 360</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Zaawansowana analityka</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Strategia długoterminowa</li>
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
              Skuteczne kampanie Google Ads <br/>
              <span className="text-primary">dla firm {city.fromCity}.</span>
            </h2>
            
            <p className="text-white/60 leading-relaxed mb-6">
              Potrzebujesz klientów „na wczoraj”? Żaden kanał nie działa tak szybko i precyzyjnie jak <strong>reklama Google Ads {city.inCity}</strong>. Kiedy Twoi potencjalni klienci wpisują w wyszukiwarkę zapytania związane z Twoją branżą, Twoja oferta musi pojawić się na samej górze. W Digitay sprawiamy, że proces ten jest maksymalnie zyskowny.
            </p>

            <p className="text-white/60 leading-relaxed mb-6">
              Nasze kampanie <strong>Google Ads {city.inCity}</strong> opierają się na twardej analityce. Nie tylko dobieramy trafne słowa kluczowe, ale przede wszystkim optymalizujemy każdy element lejka sprzedażowego. Skupiamy się na lokalizacji Twojej firmy {city.inCity}, wykluczając nieefektywny ruch i budując zasięgi tam, gdzie realnie znajdują się Twoi odbiorcy. 
            </p>

            <div className="my-12 p-8 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
               <h3 className="text-xl font-heading font-bold text-white mb-4 italic">Wyniki mierzone w sprzedaży</h3>
               <p className="text-white/50 text-sm md:text-base italic leading-relaxed">
                 „Kampania Google Ads przygotowana przez Digitay {city.inCity} zaczęła przynosić zwroty już pierwszego dnia. Precyzyjne targetowanie na rejon obsługiwany przez naszą firmę to był klucz do sukcesu.”
               </p>
            </div>

            <p className="text-white/60 leading-relaxed mb-6">
              Niezależnie od tego, czy interesuje Cię prosta reklama w wyszukiwarce, kampania produktowa, czy zaawansowany remarketing – dostarczamy rozwiązania skrojone pod <strong>biznes {city.fromCity}</strong>. Wykorzystujemy mechanizmy geofencingu i inteligentnego licytowania, abyś płacił tylko za te kliknięcia, które mają największą szansę stać się zamówieniem.
            </p>

            <p className="text-white/60 leading-relaxed mb-12">
              Dlaczego warto z nami współpracować? Bo dla nas budżet reklamowy to inwestycja, która musi się zwrócić. W Digitay otrzymasz pełny wgląd w statystyki Twoich <strong>reklam {city.inCity}</strong>, dowiadując się dokładnie, skąd przychodzą Twoi nowi klienci. Skontaktuj się z nami i sprawdź, jak szybko możemy rozkręcić sprzedaż w Twojej firmie.
            </p>

            <Link href="/kontakt" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
               Darmowy audyt i strategia dla firm {city.fromCity}
               <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <HomeContactForm />

      {/* LOCAL REACH SECTION */}
      <LocalReachSection serviceName="Kampanie Google ADS" baseSlug="kampanie-google-ads" />

      {/* CTA */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
            Gotowy na <br/> {city.inCity.toUpperCase()}<span className="text-primary italic font-light">?</span>
          </h2>
          <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Uruchomimy Twoją maszynę sprzedażową w 24h. Bezpiecznie, mierzalnie i z pełnym wsparciem.
          </p>
          <Link href="/kontakt" className="bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] inline-flex items-center gap-3">
             Zacznij zarabiać {city.inCity}
             <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
