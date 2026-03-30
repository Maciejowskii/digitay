"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const LETTER_DATA = [
  {
    letter: "d",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=3408&auto=format&fit=crop",
  },
  {
    letter: "i",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3472&auto=format&fit=crop",
  },
  {
    letter: "g",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=3427&auto=format&fit=crop",
  },
  {
    letter: "i",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=3470&auto=format&fit=crop",
  },
  {
    letter: "t",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=3472&auto=format&fit=crop",
  },
  {
    letter: "a",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=3413&auto=format&fit=crop",
  },
  {
    letter: "y",
    image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?q=80&w=3470&auto=format&fit=crop",
  },
];

const DEFAULT_IMAGE = LETTER_DATA[0].image;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const brandY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-80%"]);
  const brandScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 0.5, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[130vh] overflow-hidden"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Images - smooth crossfade */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
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
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/40 via-transparent to-background/30" />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ opacity: taglineOpacity }}
          className="absolute left-8 md:left-16 top-[45%] -translate-y-1/2 z-10"
        >
          <p className="text-white/80 text-xl md:text-3xl font-light leading-[1.4] max-w-sm md:max-w-lg">
            Działania w sieci,
            <br />
            które przyniosą twojej firmie
            <br />
            klientów i widoczność
          </p>
        </motion.div>

        {/* Giant Brand Text - scrolls up, scales up, fades out */}
        <motion.div
          className="absolute bottom-8 md:bottom-12 left-0 right-0 z-10 pointer-events-auto select-none flex justify-center origin-bottom"
          style={{
            y: brandY,
            scale: brandScale,
            opacity: brandOpacity,
          }}
        >
          <div className="flex justify-center items-end">
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
          style={{ opacity: taglineOpacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1 pointer-events-none"
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
      </div>
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
