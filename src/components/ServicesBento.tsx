"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowUpRight, Globe, ShoppingCart, Target, Megaphone, Search } from "lucide-react";
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
    href: "/uslugi/tworzenie-stron",
    icon: Globe,
  },
  {
    id: "02",
    title: "Sklepy Internetowe",
    tags: ["e-commerce", "płatności", "konwersja"],
    description:
      "Sklepy zoptymalizowane pod sprzedaż. Od konfiguracji produktów po automaty odzyskujące porzucone koszyki.",
    color: "#22D06A",
    href: "/uslugi/sklepy-internetowe",
    icon: ShoppingCart,
  },
  {
    id: "03",
    title: "Kampanie Google Ads",
    tags: ["search", "pmax", "youtube"],
    description:
      "Precyzyjne kampanie Google Ads — Search, PMax, YouTube. Optymalizacja pod realny zwrot z inwestycji.",
    color: "#0D9488",
    href: "/uslugi/kampanie-google-ads",
    icon: Target,
  },
  {
    id: "04",
    title: "Reklamy Facebook Ads",
    tags: ["meta ads", "instagram", "remarketing"],
    description:
      "Kampanie na Facebooku i Instagramie. Prospecting, remarketing i skalowanie — scroll zamieniony w sprzedaż.",
    color: "#6366F1",
    href: "/uslugi/reklamy-facebook-ads",
    icon: Megaphone,
  },
  {
    id: "05",
    title: "Pozycjonowanie SEO",
    tags: ["audyty", "link building", "optymalizacja"],
    description:
      "Podejście data-driven. Skalowalne strategie SEO, które podnoszą widoczność i przyciągają ruch jakościowy.",
    color: "#10B981",
    href: "/uslugi/pozycjonowanie-seo",
    icon: Search,
  },
];

const marqueeItems = [
  "Pozycjonowanie SEO",
  "Tworzenie Stron",
  "Sklepy Internetowe",
  "Kampanie Google Ads",
  "Facebook Ads",
  "UI/UX Design",
  "Branding",
  "E-commerce",
];

// Glow card component
function ServiceCard({ service, index, size = "default" }: { service: typeof services[0], index: number, size?: "large" | "default" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isLarge = size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-full rounded-3xl border border-white/5 bg-[#0A131F]/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Dynamic Cursor Glow Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${service.color}15, transparent 80%)`,
        }}
      />

      {/* Dynamic Cursor Glow Border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${service.color}50, transparent 80%)`,
          maskImage: "linear-gradient(black, black) content-box content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
        style={{ backgroundColor: service.color }}
      />

      <Link href={service.href} className="block h-full">
        <div className={`relative flex flex-col justify-between h-full z-10 ${isLarge ? 'p-10 md:p-14' : 'p-8 md:p-10'}`}>
          <div>
            {/* Header row: icon + number */}
            <div className="flex justify-between items-start mb-8">
              <div
                className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center group-hover:border-white/20 transition-all duration-500"
                style={{ ["--glow-color" as string]: service.color }}
              >
                <service.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" style={{ filter: "drop-shadow(0 0 0px transparent)" }} />
              </div>
              <span className={`font-mono font-black text-white/[0.04] group-hover:text-white/[0.08] transition-colors pointer-events-none select-none ${isLarge ? 'text-7xl' : 'text-6xl'}`}>
                {service.id}
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-heading font-black text-white tracking-tight group-hover:text-white transition-colors mb-4 ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
              {service.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-white/40 border border-white/10 rounded-full px-3 py-1 group-hover:border-white/20 group-hover:text-white/60 transition-colors bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className={`text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300 ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
              {service.description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 mt-10 text-sm font-bold transition-colors duration-300" style={{ color: service.color }}>
            Poznaj szczegóły
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>

      {/* Background glow */}
      <div 
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none"
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

      {/* Scrolling Marquee */}
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

      {/* Service Cards — 2 + 3 Bento Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top row: 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {services.slice(0, 2).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} size="large" />
          ))}
        </div>

        {/* Bottom row: 3 medium cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.slice(2).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
