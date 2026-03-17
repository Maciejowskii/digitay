"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({ tag, title, titleAccent, description, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 md:mb-24 ${centered ? "text-center" : ""}`}
    >
      {tag && (
        <span className="font-mono text-xs text-brand-green tracking-[0.2em] uppercase mb-4 block">
          {tag}
        </span>
      )}
      <h1 className="text-5xl md:text-8xl font-heading font-black tracking-tighter uppercase mb-6 leading-none">
        {title} {titleAccent && <span className="text-brand-green">{titleAccent}</span>}
      </h1>
      {description && (
        <p className={`text-[#CED0DF] font-mono text-sm md:text-base leading-relaxed uppercase ${centered ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
