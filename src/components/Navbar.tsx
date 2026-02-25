"use client";

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-0 border-b border-white/10 ${
        scrolled ? "bg-[#07101B]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-black font-heading rounded-none group-hover:bg-primary transition-colors">
            D
          </div>
          <span className="text-xl font-heading font-black tracking-tighter text-white uppercase sm:block hidden">
            DIGITAY //
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="h-full flex items-center text-xs font-mono tracking-widest uppercase text-muted hover:text-white transition-colors border-b-2 border-transparent hover:border-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="tel:+48733172145"
          className="group flex items-center gap-3 bg-white hover:bg-primary border border-white hover:border-primary px-6 py-2.5 rounded-none transition-colors duration-0"
        >
          <Phone className="w-4 h-4 text-black" />
          <span className="text-xs font-bold tracking-widest text-black uppercase">
            Darmowa wycena
          </span>
        </Link>
      </div>
    </header>
  );
}
