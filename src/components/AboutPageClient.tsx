"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Rocket, Code, Palette, TrendingUp, Users, Target, Zap, Globe } from "lucide-react";
import Link from "next/link";
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
    desc: "Poznajemy Twój biznes, cele i użytkowników. Analizujemy rynek i konkurencję, żeby wiedzieć gdzie uderzyć.",
    icon: Target,
  },
  {
    num: "02",
    title: "Strategia & Design",
    desc: "Projektujemy interfejsy i doświadczenia użytkownika oparte na twardych danych, nie domysłach.",
    icon: Palette,
  },
  {
    num: "03",
    title: "Development",
    desc: "Budujemy w React, Next.js i nowoczesnych technologiach. Szybko, skalowalnie, z myślą o przyszłości.",
    icon: Code,
  },
  {
    num: "04",
    title: "Launch & Wzrost",
    desc: "Wdrażamy, mierzymy i optymalizujemy. SEO, kampanie, analityka — pomagamy rosnąć.",
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
    desc: "Nie jesteśmy outsourcingową fabryką. Jesteśmy Twoim partnerem technologicznym, który myśli o Twoim biznesie jak o swoim.",
  },
  {
    icon: Globe,
    title: "Innowacja",
    desc: "Stale poszukujemy nowych rozwiązań. Łączymy sprawdzone technologie z nowinkami, żeby dać Ci przewagę.",
  },
  {
    icon: Rocket,
    title: "Rezultaty",
    desc: "Liczy się to co mierzalne. Każdy projekt oceniamy przez pryzmat ROI, konwersji i realnego wpływu na biznes.",
  },
];

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="bg-background text-white">
      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden pt-32 pb-20 md:pb-28">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="max-w-6xl mx-auto px-6 md:px-12 relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm tracking-widest mb-8 block"
          >
            [ O nas ]
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[0.95] mb-8"
          >
            Budujemy produkty
            <br />
            <span className="text-white/30 font-light italic">cyfrowe przyszłości.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Digitay to butikowy software house i agencja kreatywna. Łączymy
            inżynierski rygor z bezkompromisowym designem, żeby dostarczać
            rozwiązania, które naprawdę działają.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════ */}
      <section className="border-y border-white/5 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-2 tabular-nums">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-white/30 text-sm tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OUR STORY - Two column layout
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - sticky heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <span className="text-primary text-sm tracking-widest mb-6 block">
                [ Nasza historia ]
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight leading-[1.1] mb-6">
                Od pasji do
                <br />
                <span className="text-white/30 font-light italic">technologii.</span>
              </h2>
              <div className="w-16 h-[2px] bg-primary" />
            </motion.div>

            {/* Right - paragraphs */}
            <div className="flex flex-col gap-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-white/60 text-lg leading-relaxed"
              >
                Zaczęło się od prostego przekonania: polskie firmy zasługują na
                światowej klasy produkty cyfrowe. Zbyt długo widzieliśmy jak
                agencje dostarczają przeciętne rozwiązania za premium ceny.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/60 text-lg leading-relaxed"
              >
                Dlatego powstało Digitay — zespół ludzi, którzy nie godzą się na
                kompromisy. Każdy projekt traktujemy jak swój własny produkt.
                Analizujemy, projektujemy, budujemy i optymalizujemy.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/60 text-lg leading-relaxed"
              >
                Nie jesteśmy masową fabryką stron. Jesteśmy butikowym studiem
                technologicznym, które celowo pracuje z ograniczoną liczbą
                klientów — bo jakość wymaga pełnego zaangażowania.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-4"
              >
                <blockquote className="border-l-2 border-primary pl-6 text-white text-xl md:text-2xl font-heading font-semibold leading-snug italic">
                  „Nie budujemy stron. Budujemy maszyny do generowania
                  przychodu."
                </blockquote>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VALUES
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-primary text-sm tracking-widest mb-6 block">
              [ Nasze wartości ]
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
              W co wierzymy<span className="text-primary">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-500">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-500">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-primary text-sm tracking-widest mb-6 block">
              [ Nasz proces ]
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
              Jak działamy<span className="text-primary">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all duration-500"
              >
                {/* Step number */}
                <span className="text-5xl font-heading font-black text-white/[0.04] absolute top-4 right-6 group-hover:text-primary/10 transition-colors duration-500">
                  {step.num}
                </span>

                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-500">
                  {step.desc}
                </p>

                {/* Connecting line on desktop */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BIG CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.05] text-white mb-6">
              Gotowy na współpracę<span className="text-primary">?</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
              Porozmawiajmy o Twoim projekcie. Bez zobowiązań, bez presji —
              tylko konkrety.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(25,163,84,0.25)]"
              >
                Skontaktuj się
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/case-study"
                className="inline-flex items-center gap-2 border border-white/15 text-white/70 px-10 py-5 rounded-full font-medium text-lg hover:border-primary/40 hover:text-white transition-all duration-300"
              >
                Zobacz realizacje
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
