"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// Each letter gets its own space-themed background image
const LETTER_DATA = [
  {
    letter: "d",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=3408&auto=format&fit=crop", // shuttle launch
  },
  {
    letter: "i",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3472&auto=format&fit=crop", // earth from space at night
  },
  {
    letter: "g",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3427&auto=format&fit=crop", // nebula
  },
  {
    letter: "i",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=3470&auto=format&fit=crop", // astronaut spacewalk
  },
  {
    letter: "t",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=3472&auto=format&fit=crop", // earth horizon from orbit
  },
  {
    letter: "a",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=3413&auto=format&fit=crop", // milky way night sky
  },
  {
    letter: "y",
    image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?q=80&w=3470&auto=format&fit=crop", // rocket trail in sky
  },
];

const DEFAULT_IMAGE = LETTER_DATA[0].image; // shuttle launch as default

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const brandY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Images - crossfade on letter hover */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        {/* All images preloaded, only active one visible */}
        {LETTER_DATA.map((item) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{
              objectPosition: "center 30%",
              opacity: activeImage === item.image ? 1 : 0,
            }}
          />
        ))}
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/30 to-background/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/50 via-transparent to-background/30" />

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10"
      >
        <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-[200px]">
          Tworzymy strony,
          <br />
          które ludzie
          <br />
          zapamiętują.
        </p>
      </motion.div>

      {/* Giant Brand Text at bottom - FULLY VISIBLE, no clipping */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-0 right-0 z-10 pointer-events-auto select-none"
        style={{ y: brandY }}
      >
        <div className="flex w-full justify-center items-end">
          {LETTER_DATA.map((item, i) => (
            <HeroLetter
              key={i}
              letter={item.letter}
              index={i}
              onHover={() => setActiveImage(item.image)}
              onLeave={() => setActiveImage(DEFAULT_IMAGE)}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-white/30 text-[10px] tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-5 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function HeroLetter({
  letter,
  index,
  onHover,
  onLeave,
}: {
  letter: string;
  index: number;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave();
      }}
      className="cursor-default transition-all duration-300 ease-out"
      style={{
        fontSize: "clamp(60px, 13vw, 240px)",
        fontFamily: "var(--font-plus-jakarta)",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color: isHovered ? "rgba(255,255,255,0.35)" : "#ffffff",
        display: "inline-block",
        textShadow: isHovered ? "0 0 60px rgba(25,163,84,0.25)" : "none",
      }}
    >
      {letter}
    </motion.span>
  );
}
