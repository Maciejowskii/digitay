"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    num: "01",
    title: "BEZWZGLĘDNA JAKOŚĆ",
    desc: "Nie uznajemy półśrodków. Nasz kod służy biznesowi, a design przewodzi w branży. Każdy komponent ma cel.",
  },
  {
    num: "02",
    title: "TECHNOLOGIA JUTRA",
    desc: "Odrzucamy przestarzałe frameworki. Operujemy na nowoczesnym stacku, co zapewnia niezrównaną szybkość i metryki SEO.",
  },
  {
    num: "03",
    title: "SUROWA EFEKTYWNOŚĆ",
    desc: "Zero korporacyjnego bełkotu. Transparentna komunikacja i dowożenie wyników, które skalują Twój biznes.",
  },
  {
    num: "04",
    title: "SKUPIONY DESIGN",
    desc: "Projektujemy interfejsy z myślą o użyteczności. Złożone problemy rozwiązujemy radykalnym minimalizmem.",
  }
];

const team = [
  {
    name: "Maciej Tyra",
    role: "FOUNDER & LEAD ENGINEER",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Kamil Kowalski",
    role: "HEAD OF DESIGN",
    img: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Anna Nowak",
    role: "GROWTH LEAD",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-32"
      >
        {/* HERO SECTION */}
        <motion.section variants={itemVariants} className="max-w-4xl">
          <h3 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-8">
            // O NAS
          </h3>
          <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-heading font-black text-white leading-[0.9] tracking-tighter mb-8">
            NIE JESTEŚMY <br/> KOLEJNĄ AGENCJĄ.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-mono max-w-2xl leading-relaxed uppercase">
            Jesteśmy cyfrowym software house'm nowego formatu. Łączymy inżynierię oprogramowania na najwyższym poziomie z bezkompromisowym designem. Budujemy produkty, z których sami chcielibyśmy korzystać.
          </p>
        </motion.section>

        {/* MANIFESTO / VALUES */}
        <motion.section variants={itemVariants} className="border-t border-white/10 pt-16">
           <h2 className="text-sm font-mono tracking-widest text-primary uppercase mb-12">
             [ NASZ MANIFEST ]
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
             {values.map((v, i) => (
               <div key={i} className="bg-background relative p-8 md:p-12 overflow-hidden group">
                 {/* Giant number behind */}
                 <span className="absolute -bottom-8 -right-4 text-[180px] font-mono leading-none text-white opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
                   {v.num}
                 </span>
                 <div className="relative z-10">
                   <h3 className="text-2xl font-heading font-bold text-white mb-4 uppercase tracking-tight">
                     {v.title}
                   </h3>
                   <p className="text-zinc-500 text-sm font-mono leading-relaxed uppercase pr-8">
                     {v.desc}
                   </p>
                 </div>
               </div>
             ))}
           </div>
        </motion.section>

        {/* TEAM */}
        <motion.section variants={itemVariants} className="border-t border-white/10 pt-16">
          <h2 className="text-sm font-mono tracking-widest text-primary uppercase mb-12">
             [ ZESPÓŁ INŻYNIERÓW ]
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {team.map((member, i) => (
               <div key={i} className="flex flex-col group">
                 {/* Rectangle Image Container */}
                 <div className="w-full aspect-[4/5] bg-white/5 border border-white/10 relative overflow-hidden mb-6">
                   <Image 
                     src={member.img} 
                     alt={member.name}
                     fill
                     className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                   />
                 </div>
                 <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
                   <h4 className="text-white font-heading font-bold text-xl uppercase tracking-tighter">
                     {member.name}
                   </h4>
                   <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                     // {member.role}
                   </p>
                 </div>
               </div>
             ))}
           </div>
        </motion.section>

      </motion.div>
    </main>
    <Footer />
    </>
  );
}
