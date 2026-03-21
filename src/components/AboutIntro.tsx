"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function AboutIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(25,163,84,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="max-w-6xl mx-auto px-6 md:px-12"
      >
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

        {/* Large intro text with word-by-word reveal */}
        <div className="mb-16">
          <AnimatedText
            text="Jesteśmy zespołem designerów i developerów, który łączy siły z ambitnymi firmami nastawionymi na sukces."
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.15] tracking-tight"
          />
        </div>

        <div className="mb-16">
          <AnimatedText
            text="Budujemy i rozwijamy wydajne strony internetowe i produkty cyfrowe."
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white/60 leading-[1.3] tracking-tight"
            delay={0.3}
          />
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 group"
          >
            Skontaktuj się
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:border-primary hover:text-primary transition-all duration-300"
          >
            Poznaj nasze usługi
          </Link>
        </motion.div>
      </motion.div>
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
          initial={{ opacity: 0.15 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
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
