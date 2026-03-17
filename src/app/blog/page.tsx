import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/frontend/SectionHeader";
import { motion } from "framer-motion";

// Mock posts for "tymczasowy widok" as requested
const mockPosts = [
  {
    title: "Jak SEO wspiera skalowanie nowoczesnych SaaSów?",
    excerpt: "Analizujemy kluczowe czynniki technicznego SEO, które pozwalają aplikacjom Next.js dominować w wynikach wyszukiwania.",
    tag: "STRATEGIA // SEO",
    date: "14 marca 2024"
  },
  {
    title: "Dlaczego Next.js 16 to game-changer dla E-commerce?",
    excerpt: "Poznaj zalety Turbopacka i nowej architektury komponentów w kontekście sklepów o dużej skali.",
    tag: "TECHNOLOGIA // WEB",
    date: "10 marca 2024"
  },
  {
    title: "Psychologia koloru w designie Tech Brutalism",
    excerpt: "Jak używać kontrastów i odważnych barw, aby budować autorytet marki technologicznej.",
    tag: "DESIGN // UI",
    date: "05 marca 2024"
  }
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 md:pt-40">
        
        {/* Header Section */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeader 
            tag="// BAZA WIEDZY"
            title="Ostatnie"
            titleAccent="Artykuły"
            description="Dzielimy się wiedzą o technologii, marketingu i designie. Poznaj nasze spostrzeżenia i naucz się budować lepsze produkty cyfrowe."
          />
        </div>

        {/* Blog Grid Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.map((post, idx) => (
              <div
                key={idx}
                className="group p-8 border border-white/10 bg-white/5 hover:border-brand-green/30 transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[400px]"
              >
                <div>
                  <span className="text-brand-green font-mono text-[10px] tracking-widest uppercase mb-6 block">
                    {post.tag}
                  </span>
                  <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter leading-tight group-hover:text-brand-green transition-colors mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#CED0DF] font-mono text-xs uppercase leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
                   <span className="font-mono text-[10px] text-white/40 uppercase">{post.date}</span>
                   <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-green group-hover:border-brand-green group-hover:text-black transition-all">
                      <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
