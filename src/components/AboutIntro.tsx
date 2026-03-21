"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
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
    icon: Rocket,
    title: "Strategia",
    desc: "Zanim napiszemy linijkę kodu, rozumiemy Twój biznes. Analizujemy rynek, konkurencję i użytkowników.",
  },
  {
    icon: Palette,
    title: "Design",
    desc: "Projektujemy interfejsy, które nie tylko wyglądają, ale przede wszystkim konwertują i angażują.",
  },
  {
    icon: Code,
    title: "Development",
    desc: "Budujemy w najnowszych technologiach. Szybko, skalowalnie i z myślą o przyszłości.",
  },
  {
    icon: TrendingUp,
    title: "Wzrost",
    desc: "SEO, kampanie, optymalizacja. Nie kończymy na wdrożeniu — pomagamy rosnąć.",
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

// Interactive cursor-following glow
function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-[0.04]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, #19A354 0%, transparent 70%)",
      }}
    />
  );
}

export default function AboutIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Horizontal reveal line animation
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Interactive cursor glow */}
      <CursorGlow />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(25,163,84,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── PART 1: Big Statement ─── */}
      <div className="py-32 md:py-48">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm tracking-widest mb-12 block"
          >
            [ O nas ]
          </motion.span>

          {/* Large text with word reveal */}
          <div ref={textRef} className="mb-12">
            <AnimatedText
              text="Jesteśmy zespołem designerów i developerów, który łączy siły z ambitnymi firmami nastawionymi na sukces."
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.15] tracking-tight"
            />
          </div>

          <div className="mb-16">
            <AnimatedText
              text="Od pomysłu, przez design, aż po kod i wdrożenie. Budujemy produkty cyfrowe, które zmieniają reguły gry."
              className="text-xl md:text-2xl lg:text-3xl font-heading font-light text-white/50 leading-[1.3] tracking-tight"
              delay={0.3}
            />
          </div>

          {/* Animated divider line */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-primary via-primary/50 to-transparent mb-20"
            style={{ width: lineWidth }}
          />

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(25,163,84,0.3)]"
            >
              Skontaktuj się
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 border border-white/15 text-white/80 px-8 py-4 rounded-full font-medium hover:border-primary/50 hover:text-white transition-all duration-300"
            >
              Poznaj nasze usługi
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ─── PART 2: Animated Stats ─── */}
      <div className="border-t border-white/5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center md:text-left group"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-2 tabular-nums">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-white/30 text-sm tracking-wide group-hover:text-white/50 transition-colors duration-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PART 3: Four Pillars ─── */}
      <div className="border-t border-white/5 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-heading font-bold text-white tracking-tight mb-16"
          >
            Jak działamy<span className="text-primary">.</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 cursor-default"
              >
                {/* Step number */}
                <span className="text-[10px] text-white/20 tracking-widest font-mono absolute top-6 right-6">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <pillar.icon className="w-5 h-5 text-primary" />
                </div>

                <h4 className="text-lg font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {pillar.title}
                </h4>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-500">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated text component - reveals words on scroll
function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
