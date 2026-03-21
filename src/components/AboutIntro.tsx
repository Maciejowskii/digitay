"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowUpRight, Rocket, Code, Palette, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

// Stats data
const STATS = [
  { number: 50, suffix: "+", label: "Zrealizowanych projektów" },
  { number: 98, suffix: "%", label: "Zadowolonych klientów" },
  { number: 4, suffix: "lata", label: "Doświadczenia w branży" },
  { number: 12, suffix: "", label: "Ekspertów w zespole" },
];

const PILLARS = [
  {
    id: "01",
    icon: Rocket,
    title: "Strategia",
    desc: "Zanim napiszemy linijkę kodu, dokładnie rozumiemy Twój biznes. Analizujemy rynek, robimy research konkurencji i mapujemy potrzeby Twoich przyszłych użytkowników. To fundament pod produkt, który ma odnieść rynkowy sukces.",
  },
  {
    id: "02",
    icon: Palette,
    title: "Design",
    desc: "Projektujemy interfejsy z obsesją na punkcie detali. Dbamy o to, by wyglądały spektakularnie, ale przede wszystkim były intuicyjne i prowadziły użytkownika prosto do celu. Każdy pixel ma swoje zadanie.",
  },
  {
    id: "03",
    icon: Code,
    title: "Development",
    desc: "Budujemy skalowalne, bezpieczne i błyskawicznie szybkie aplikacje używając najnowocześniejszego stacku technologicznego. Piszemy czysty kod, który Twoi przyszli deweloperzy pokochają.",
  },
  {
    id: "04",
    icon: TrendingUp,
    title: "Wzrost",
    desc: "Launch to dopiero początek. Zapewniamy kompleksowe wsparcie powdrożeniowe, dbamy o SEO, optymalizujemy konwersję i prowadzimy kampanie, by Twój produkt rósł z miesiąca na miesiąc.",
  },
];

// Counter that animates from 0 to target
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Interactive cursor-following glow in background
function BackgroundGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(25, 163, 84, 0.03), transparent 80%)`,
      }}
    />
  );
}

export default function AboutIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      <BackgroundGlow />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ─── PART 1: Big Statement ─── */}
      <div className="py-32 md:py-48 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary text-sm tracking-widest uppercase font-bold">
              Poznaj zespół Digitay
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tight mb-12 max-w-5xl"
          >
            Łączymy siły z{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              ambitnymi markami
            </span>
            , by zamieniać pomysły w działające, zyskowne produkty.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl mb-16"
          >
            Nie jesteśmy kolejną agencją, która "robi strony". Jesteśmy
            technologicznym partnerem, z którym zbudujesz nowy standard na
            swoim rynku. Od strategii, przez ultra-nowoczesny design, po 
            niezawodny kod.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/o-nas"
              className="group relative inline-flex items-center gap-3 bg-white text-background px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all duration-300"
            >
              Dowiedz się więcej o nas
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 border border-white/10 text-white/80 px-8 py-4 rounded-full font-medium hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Porozmawiajmy o projekcie
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ─── PART 2: Animated Stats ─── */}
      <div className="border-y border-white/5 py-20 bg-white/[0.01] relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center md:text-left group relative"
              >
                {/* Subtle highlight line */}
                <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 to-transparent hidden md:block scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                
                <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-4 tabular-nums tracking-tighter group-hover:text-primary transition-colors duration-500">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-white/40 text-sm md:text-base tracking-wide group-hover:text-white/70 transition-colors duration-500 font-medium uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PART 3: Sticky Pillars Layout ─── */}
      <div className="py-24 md:py-48 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left side: Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight mb-6"
                >
                  Proces<span className="text-primary">.</span>
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/50 text-lg"
                >
                  Nasz system pracy gwarantuje, że nie przepalamy ani godziny.
                  Dostarczamy ultra-jakość na każdym etapie.
                </motion.p>
              </div>
            </div>

            {/* Right side: Scrolling Cards */}
            <div className="lg:w-2/3 flex flex-col gap-8 md:gap-12">
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="group relative p-8 md:p-12 rounded-3xl border border-white/5 bg-[#0A131F]/50 backdrop-blur-md overflow-hidden"
                >
                  {/* Hover background glow */}
                  <div className="absolute -inset-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    {/* Number & Icon block */}
                    <div className="shrink-0 flex flex-col items-center gap-4">
                      <span className="text-5xl md:text-6xl font-heading font-black text-white/5 group-hover:text-white/10 transition-colors">
                        {pillar.id}
                      </span>
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors duration-500">
                        <pillar.icon className="w-7 h-7 text-white/50 group-hover:text-primary transition-colors" />
                      </div>
                    </div>

                    {/* Text block */}
                    <div>
                      <h4 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6 tracking-tight">
                        {pillar.title}
                      </h4>
                      <p className="text-white/50 text-base md:text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
