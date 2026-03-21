"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Strony Internetowe",
    tags: ["next.js", "react", "gsap", "seo"],
    description:
      "High-endowe wizytówki, landingi i strony korporacyjne. Design, który hipnotyzuje i konwertuje od pierwszego kliknięcia.",
    color: "#19A354",
    href: "/uslugi",
  },
  {
    title: "Aplikacje Web & Mobile",
    tags: ["react native", "node.js", "typescript"],
    description:
      "Szyte na miarę systemy SaaS, platformy e-commerce i natywne aplikacje iOS/Android. Oprogramowanie, które użytkownicy kochają.",
    color: "#22D06A",
    href: "/uslugi",
  },
  {
    title: "Marketing & Reklama",
    tags: ["google ads", "meta ads", "seo", "social"],
    description:
      "Precyzyjne kampanie reklamowe, strategia SEO i social media. Napędzamy ruch, który konwertuje na realny przychód.",
    color: "#15803D",
    href: "/uslugi",
  },
];

const marqueeItems = [
  "Pozycjonowanie SEO",
  "Tworzenie Stron",
  "Sklepy Internetowe",
  "Social Media",
  "Google Ads",
  "Facebook Ads",
  "Aplikacje Webowe",
  "Aplikacje Mobilne",
  "Branding",
  "UI/UX Design",
];

export default function ServicesBento() {
  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary text-sm tracking-widest mb-8 block"
        >
          [ Nasze usługi ]
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1] tracking-tight"
        >
          Nasz chleb
          <br />
          <span className="text-white/40 font-light italic">powszedni</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg mt-8 max-w-xl"
        >
          Każdy projekt w Digitay zaczyna się od analizy. Nasi stratedzy
          współpracują z ambitnymi zespołami i liderami.
        </motion.p>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-8 border-y border-white/10 mb-20">
        <div className="flex w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-2xl md:text-4xl font-heading font-bold text-white/10 whitespace-nowrap mx-6 md:mx-10 hover:text-primary/40 transition-colors duration-500 cursor-default"
            >
              {item}
              <span className="text-primary/30 mx-4 md:mx-8">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Service Columns */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              {/* Color top border */}
              <div
                className="h-1 w-full rounded-t-lg mb-0"
                style={{ backgroundColor: service.color }}
              />

              <div className="border border-white/10 border-t-0 p-8 md:p-10 min-h-[400px] flex flex-col justify-between hover:border-primary/30 transition-all duration-500 rounded-b-2xl">
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-8 group-hover:gap-3 transition-all duration-300"
                >
                  Dowiedz się więcej
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
