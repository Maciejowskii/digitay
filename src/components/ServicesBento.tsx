"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";

const services = [
  {
    id: "01",
    title: "Strony Internetowe",
    tags: ["next.js", "react", "gsap", "seo"],
    description:
      "High-endowe wizytówki, landingi i strony korporacyjne. Design, który hipnotyzuje i konwertuje od pierwszego kliknięcia.",
    color: "#19A354",
    href: "/uslugi",
  },
  {
    id: "02",
    title: "Aplikacje Web & Mobile",
    tags: ["react native", "node.js", "typescript"],
    description:
      "Szyte na miarę systemy SaaS, platformy e-commerce i natywne aplikacje iOS/Android. Oprogramowanie, które użytkownicy kochają.",
    color: "#22D06A",
    href: "/uslugi",
  },
  {
    id: "03",
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

// Glow card component
function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full rounded-2xl border border-white/5 bg-[#0A131F]/80 backdrop-blur-sm overflow-hidden min-h-[420px]"
    >
      {/* Dynamic Cursor Glow Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${service.color}15, transparent 80%)`,
        }}
      />

      {/* Dynamic Cursor Glow Border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${service.color}50, transparent 80%)`,
          maskImage: "linear-gradient(black, black) content-box content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Top thin line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
        style={{ backgroundColor: service.color }}
      />

      <div className="relative p-8 md:p-10 flex flex-col justify-between h-full z-10">
        <div>
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight group-hover:text-white transition-colors">
              {service.title}
            </h3>
            <span className="font-mono text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">
              {service.id}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1 group-hover:border-white/20 transition-colors bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
            {service.description}
          </p>
        </div>

        <Link
          href={service.href}
          className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-12 group-hover:gap-3 transition-all duration-300"
        >
          Dowiedz się więcej
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Subtle abstract background shape */}
      <div 
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: service.color }}
      />
    </motion.div>
  );
}


export default function ServicesBento() {
  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden border-t border-white/5">
      
      {/* Large background gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
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
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-[1] tracking-tight"
            >
              Nasz chleb
              <br />
              <span className="text-white/40 font-light italic">powszedni</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg max-w-sm"
          >
            Każdy projekt w Digitay zaczyna się od głębokiej analizy. Używamy technologii, 
            aby rozwiązywać prawdziwe problemy biznesowe.
          </motion.p>
        </div>
      </div>

      {/* Scrolling Marquee - Made more dramatic */}
      <div className="relative w-full overflow-hidden py-10 border-y border-white/5 bg-white/[0.01] mb-24 backdrop-blur-sm">
        <div className="flex w-max animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-3xl md:text-5xl font-heading font-black text-transparent whitespace-nowrap mx-8 md:mx-12 hover:text-white transition-colors duration-500 cursor-default uppercase"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
            >
              {item}
              <span className="text-primary mx-8 md:mx-12" style={{ WebkitTextStroke: "0" }}>✺</span>
            </span>
          ))}
        </div>
      </div>

      {/* Service Columns with Glow Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
