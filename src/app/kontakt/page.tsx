"use client";

import { motion } from "framer-motion";
import ContactFaq from "@/components/ContactFaq";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
} as const;

const contactDetails = [
  {
    tag: "[ CONTACT // EMAIL ]",
    label: "Napisz do nas",
    value: "KONTAKT@DIGITAY.PL",
    link: "mailto:kontakt@digitay.pl",
  },
  {
    tag: "[ CONTACT // PHONE ]",
    label: "Zadzwoń do nas",
    value: "+48 733 172 145",
    link: "tel:+48733172145",
  },
  {
    tag: "[ BASE // LOCATION ]",
    label: "Zapraszamy na kawę",
    value: "WARSZAWA, POLSKA",
    link: "#",
  }
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Header Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16 md:mb-24"
      >
        <motion.h3 variants={itemVariants} className="font-mono text-xs text-white/40 tracking-widest uppercase mb-8">
          // KONTAKT
        </motion.h3>
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl lg:text-[100px] font-heading font-black text-white leading-[0.9] tracking-tighter mb-8">
          JESTEŚMY <br/> ONLINE.
        </motion.h1>
      </motion.div>

      {/* Contact Information Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
      >
        {contactDetails.map((detail, idx) => (
          <motion.a 
            href={detail.link}
            key={idx} 
            variants={itemVariants} 
            className="flex flex-col p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <span className="font-mono text-xs text-primary mb-8 tracking-widest">
              {detail.tag}
            </span>
            <span className="text-sm font-mono text-zinc-500 uppercase mb-2">
              {detail.label}
            </span>
            <span className="text-xl lg:text-3xl font-heading font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">
              {detail.value}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Embedded Terminal Form & FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="w-full relative"
      >
        <div className="absolute -top-12 left-0 font-mono text-xs text-white/20 tracking-widest uppercase">
          // SYSTEM FORMULARZA ZAINICJOWANY
        </div>
        {/* We use negative margin adjustments or wrapper to let ContactFaq flow naturally. */}
        <div className="-mx-6 md:-mx-12">
          <ContactFaq />
        </div>
      </motion.div>

    </main>
    <Footer />
    </>
  );
}
