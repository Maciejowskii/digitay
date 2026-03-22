"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowUpRight, Rocket, Code, Palette, TrendingUp, Users, Target, Zap, Globe, Linkedin, Mail, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// ─── Data ───
const STATS = [
  { number: 50, suffix: "+", label: "Zrealizowanych projektów" },
  { number: 98, suffix: "%", label: "Zadowolonych klientów" },
  { number: 4, suffix: "", label: "Lata na rynku" },
  { number: 12, suffix: "", label: "Ekspertów w zespole" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Odkrywanie",
    desc: "Poznajemy Twój biznes, cele i użytkowników. Analizujemy rynek i konkurencję.",
    icon: Target,
  },
  {
    num: "02",
    title: "Strategia & Design",
    desc: "Projektujemy interfejsy i doświadczenia użytkownika oparte na twardych danych.",
    icon: Palette,
  },
  {
    num: "03",
    title: "Development",
    desc: "Budujemy w React, Next.js i nowoczesnych technologiach.",
    icon: Code,
  },
  {
    num: "04",
    title: "Launch & Wzrost",
    desc: "Wdrażamy, mierzymy i optymalizujemy. SEO, kampanie, analityka.",
    icon: TrendingUp,
  },
];

const VALUES = [
  {
    icon: Zap,
    title: "Bez ściemy",
    desc: "Mówimy wprost. Żadnego lania wody, żadnych pustych obietnic. Tylko konkrety i realne wyniki.",
  },
  {
    icon: Users,
    title: "Partnerstwo",
    desc: "Nie jesteśmy outsourcingową fabryką. Jesteśmy Twoim partnerem technologicznym.",
  },
  {
    icon: Globe,
    title: "Innowacja",
    desc: "Stale poszukujemy nowych rozwiązań. Łączymy sprawdzone technologie z nowinkami.",
  },
  {
    icon: Rocket,
    title: "Rezultaty",
    desc: "Liczy się to co mierzalne. Każdy projekt oceniamy przez pryzmat ROI i konwersji.",
  },
];

const TEAM = [
  {
    name: "Jan Kowalski", // TODO: podmień dane 
    role: "CEO & Founder",
    desc: "Wizjoner technologii i strateg biznesowy. Łączy światy IT i sprzedaży, by dostarczać nie tylko kod, ale maszyny do zarabiania pieniędzy.",
    initials: "CEO",
    gradient: "from-blue-500/20 to-indigo-500/5",
  },
  {
    name: "Anna Nowak", // TODO: podmień dane
    role: "CTO",
    desc: "Główny inżynier projektujący niezawodne, skalowalne architektury systemowe. Skomplikowane problemy techniczne rozwiązuje przed śniadaniem.",
    initials: "CTO",
    gradient: "from-primary/20 to-emerald-500/5",
  },
  {
    name: "Piotr Wiśniewski", // TODO: podmień dane
    role: "Dyrektor Sprzedaży",
    desc: "Ekspert od relacji i marketingu B2B. Z nim znajdziesz optymalną ścieżkę skalowania swojego produktu na rynkach międzynarodowych.",
    initials: "DIR",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
];

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.max(Math.floor(2000 / target), 20);
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix && <span className="text-primary">{suffix}</span>}
    </span>
  );
}

// ─── Main Page Component ───
export default function AboutPageClient() {
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
          INNOVATIVE PARALLAX HERO
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
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Background"
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
            Poznaj Digitay
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
              ARCHITEKCI
            </motion.span>
            <motion.span
              style={{ x: textRightX }}
              className="text-[12vw] sm:text-[14vw] md:text-[10vw] tracking-tighter leading-[0.8] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-light ml-[15vw] drop-shadow-2xl pr-4 pb-4"
            >
              PRZEWAGI<span className="text-primary">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ opacity: textOpacity }}
            className="mt-16 text-white/50 text-base md:text-xl max-w-xl text-center leading-relaxed"
          >
            Butikowy software house. Łączymy inżynieryjny rygor z bezkompromisowym designem, tworząc maszyny do skalowania Twojego biznesu.
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
          STATS BAR
      ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-5xl md:text-6xl font-heading font-black text-white mb-3 tabular-nums drop-shadow-lg">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="h-1 w-12 bg-primary/30 rounded-full mb-3 mx-auto md:mx-0 group-hover:bg-primary transition-colors" />
                <p className="text-white/40 text-sm md:text-base tracking-wide font-medium uppercase font-sans">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOARD MEMBERS (ZARZĄD) - NEW!
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row gap-8 items-end justify-between"
          >
            <div>
              <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
                Zarząd & Założyciele
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight">
                Kierunek <span className="text-white/30 italic font-light">Digitay</span>
              </h2>
            </div>
            <p className="mt-6 text-white/50 text-lg max-w-md md:mx-0 mx-auto text-left">
              Liderzy, którzy wyznaczają standardy cyfrowej doskonałości. Połączenie wiedzy biznesowej, i innowacyjnej technologii.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Placeholder / Avatar Container */}
                <div className={`aspect-square w-full relative bg-gradient-to-br ${member.gradient} p-8 flex flex-col justify-end overflow-hidden`}>
                  {/* Big initials background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-heading font-black text-white/[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 group-hover:text-white/[0.06]">
                    {member.initials}
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold tracking-wider uppercase text-white/90 mb-2">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <h3 className="text-2xl font-heading font-bold text-white mb-3 relative z-10">
                    {member.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8 h-[80px] relative z-10">
                    {member.desc}
                  </p>

                  <div className="flex gap-3 relative z-10">
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BENTO GRID VALUES
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 text-center"
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-4 block">
              Zasady Gry
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Nasz manifest.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Bento Box 1 - spans 2 cols on md */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 group relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-500 bg-primary w-64 h-64 rounded-full" />
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Bez ściemy</h3>
              <p className="text-white/50 text-lg max-w-md leading-relaxed">
                Mówimy wprost. Żadnego lania wody i pustych obietnic. Stawiamy na radykalną transparentność, kodowanie premium i realne uderzenie w rynek.
              </p>
            </motion.div>

            {/* Bento Box 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Innowacja</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Technologia nie śpi. Łączymy stabilne stacki (Next.js, React) z nowościami, by dać rynkową przewagę.
                </p>
              </div>
            </motion.div>

            {/* Bento Box 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Partnerstwo</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Nie jesteśmy taśmą produkcyjną. Myślimy o produkcie jak o własnym. Niesiemy wspólne ryzyko.
              </p>
            </motion.div>

            {/* Bento Box 4 - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 group relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 to-transparent hover:border-primary/30 transition-all duration-500 overflow-hidden flex items-center"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 w-96 h-96 group-hover:rotate-12 transition-transform duration-700">
                <Rocket className="w-full h-full text-primary" strokeWidth={1} />
              </div>
              <div className="relative z-10 w-full md:w-2/3">
                <div className="inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider mb-6">
                  CEL GŁÓWNY
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">Mierzalne rezultaty</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  Design bez konwersji to tylko obrazek. Kod bez użyteczności to tylko plik tekstu. Budujemy po to, by podnosić Twoje wskaźniki i docelowe ROI.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROCESS (Sticky Story)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - sticky heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-40"
            >
              <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
                Zza kulis
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight leading-[1.1] mb-8">
                Kodujemy z <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                  obsesją na punkcie jakości
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                Każdy projekt przechodzi przez nasz bezwzględny proces, eliminując domysły i zapewniając przewidywalny sukces.
              </p>
              
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-4 text-white font-medium text-lg hover:text-primary transition-colors"
                >
                <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:text-primary" />
                </div>
                Rozpocznij projekt
              </Link>
            </motion.div>

            {/* Right - scrolling process / story cards */}
            <div className="flex flex-col gap-8 md:gap-12 lg:pt-12 mt-8 lg:mt-0">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-500"
                >
                  <div className="absolute top-8 right-8 text-6xl font-heading font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors select-none">
                    {step.num}
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
          MEGA CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center">
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[1] text-white mb-8">
              Zróbmy to <span className="text-primary italic font-light">razem.</span>
            </h2>
            <p className="text-white/50 text-xl lg:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Przestań tracić czas na domysły. Zbudujemy platformę, która wniesie Twój biznes na nowy poziom i wygeneruje mierzalny zysk.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.3)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Porozmawiajmy o projekcie
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
