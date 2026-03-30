"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Group phrases so they wrap together cleanly
  const PHRASES = [
    { text: "Bez ściemy.", highlight: false },
    { text: "Bez lania wody.", highlight: false },
    { text: "Same ", highlight: false, noSpace: false },
    { text: "konkrety.", highlight: true }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Animated gradient orb */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-cyan-500/05 rounded-full blur-[120px]" />
        <div className="absolute inset-8 bg-gradient-to-tl from-primary/5 via-transparent to-emerald-800/5 rounded-full blur-[100px] animate-pulse" />
      </motion.div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(25,163,84,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(25,163,84,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10 w-full">
        {/* Giant manifesto text - phrase by phrase reveal */}
        <div className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-white leading-[1.1] tracking-tight mb-12 flex flex-col md:block items-center justify-center gap-y-2 max-w-5xl mx-auto text-balance">
          {PHRASES.map((phrase, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`inline-block ${phrase.noSpace ? "" : "mr-[0.3em]"} ${
                phrase.highlight ? "text-primary relative" : ""
              }`}
            >
              {phrase.text}
              {phrase.highlight && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full h-[3px] md:h-[5px] bg-primary origin-left"
                />
              )}
            </motion.span>
          ))}
        </div>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed text-balance"
        >
          Upraszczamy procesy, żeby skupić się na tym, co naprawdę ważne: Twoje
          pomysły i ich realizacja. Bezpośredni kontakt i współpraca z ludźmi,
          którzy budują Twój produkt, bez zbędnej biurokracji.
        </motion.p>

        {/* CTA with animated border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center"
        >
          <Link
            href="/kontakt"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-medium text-white overflow-hidden"
          >
            {/* Animated gradient border */}
            <span className="absolute inset-0 rounded-full p-[1px] overflow-hidden">
              <span
                className="absolute inset-[-200%] animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, #19A354 25%, transparent 50%, #19A354 75%, transparent 100%)",
                  animationDuration: "4s",
                }}
              />
              <span className="absolute inset-[1px] rounded-full bg-background" />
            </span>
            <span className="relative z-10 flex items-center gap-3">
              Umów Konsultacje
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Side floating labels */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:flex flex-col gap-3 pointer-events-none"
      >
        {["Analiza", "Design", "Development", "Wsparcie"].map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="text-xs text-white/20 tracking-widest uppercase"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      {/* Right side decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-[20%] right-12 w-[1px] h-[60%] bg-gradient-to-b from-transparent via-primary/20 to-transparent origin-top hidden lg:block pointer-events-none"
      />
    </section>
  );
}
