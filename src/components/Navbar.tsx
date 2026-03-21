"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "usługi", href: "/uslugi" },
  { name: "realizacje", href: "/case-study" },
  { name: "blog", href: "/blog" },
  { name: "o nas", href: "/o-nas" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className={`w-full px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/5" : ""}`}>
          {/* Logo - left */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xl font-heading font-bold text-white tracking-tight"
            >
              digitay
              <span className="text-primary">.</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation - right side like reference */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </Link>
            ))}

            {/* Contact CTA - pill with arrow circle like reference */}
            <div className="flex items-center gap-2">
              <Link
                href="/kontakt"
                className="text-sm text-white border border-white/30 rounded-full px-5 py-2 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                kontakt
              </Link>
              <Link
                href="/kontakt"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-white transition-colors" />
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white hover:text-primary transition-colors pointer-events-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 md:hidden flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col gap-8 items-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-heading font-bold text-white hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  href="/kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold"
                >
                  kontakt
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
