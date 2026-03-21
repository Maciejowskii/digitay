"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Manifesto() {
  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Giant manifesto text */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-8xl font-heading font-black text-white leading-[1] tracking-tight mb-8"
        >
          Bez ściemy.
          <br />
          Bez lania wody.
          <br />
          <span className="relative inline-block">
            Same{" "}
            <span className="text-primary relative">
              konkrety
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 w-full h-[3px] bg-primary origin-left"
              />
            </span>
            .
          </span>
        </motion.h2>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Upraszczamy procesy, żeby skupić się na tym, co naprawdę ważne: Twoje
          pomysły i ich realizacja. Bezpośredni kontakt i współpraca z ludźmi,
          którzy budują Twój produkt, bez zbędnej biurokracji.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-primary hover:border-primary transition-all duration-500 group"
          >
            Współpracujmy
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative side elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col gap-3">
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
        </div>
      </motion.div>
    </section>
  );
}
