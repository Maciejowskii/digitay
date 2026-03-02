"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "O nas", href: "/o-nas" },
  { name: "Usługi", href: "/uslugi" },
  { name: "Case Study", href: "/case-study" },
  { name: "Blog", href: "/blog" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-150%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 pointer-events-none"
      >
        <div className="bg-[#07101B]/70 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-black font-heading rounded-full group-hover:bg-brand-green transition-colors duration-300">
              D
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-tight hidden sm:block">
              Digitay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#CED0DF] hover:text-brand-green transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full hover:bg-brand-green hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">
                  Darmowa wycena
                </span>
              </Link>
            </motion.div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-white hover:text-brand-green transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu Dropdown (Simplified) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-24 z-40 bg-[#07101B]/95 md:hidden px-6 pt-6">
           <nav className="flex flex-col gap-6 items-center">
             {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-white tracking-wide"
                >
                  {link.name}
                </Link>
             ))}
             <Link
                href="tel:+48733172145"
                className="mt-4 flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full w-full justify-center"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg font-bold">
                  Darmowa wycena
                </span>
              </Link>
           </nav>
        </div>
      )}
    </>
  );
}
