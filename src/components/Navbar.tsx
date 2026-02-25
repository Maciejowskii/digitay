"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "O nas", href: "#about" },
  { name: "Usługi", href: "#services" },
  { name: "Case Study", href: "#cases" },
  { name: "Blog", href: "#blog" },
  { name: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass border-b border-white/10" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold font-heading shadow-[0_0_15px_rgba(25,163,84,0.5)] group-hover:scale-105 transition-transform duration-300">
            D
          </div>
          <span className="text-xl font-heading font-bold tracking-tight text-white hidden sm:block">
            Digitay<span className="text-primary">.pl</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-card/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/5 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="tel:+48733172145"
          className="group flex items-center gap-2 bg-card border border-primary/30 hover:border-primary px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(25,163,84,0.2)]"
        >
          <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">
            +48 733 172 145
          </span>
        </Link>
      </div>
    </motion.header>
  );
}
