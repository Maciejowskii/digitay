"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, MoreHorizontal, Edit2, CheckCircle2, Clock } from "lucide-react";

// Mock data
const mockServices = [
  { id: 1, name: "Audyt SEO Premium", category: "SEO", price: "2 500 PLN", status: "Opublikowano" },
  { id: 2, name: "Kampania Meta Ads", category: "Ads", price: "od 1 500 PLN", status: "Opublikowano" },
  { id: 3, name: "Strona Wizytówka", category: "Strony WWW", price: "4 000 PLN", status: "Szkic" },
];

export default function ServicesPage() {
  const [services] = useState(mockServices);
  const [isEmpty, setIsEmpty] = useState(false); // Toggle for preview testing

  // --- EMPTY STATE ---
  if (isEmpty || services.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-12rem)] min-h-[400px] flex flex-col items-center justify-center p-8">
        <div className="relative mb-8">
          {/* Blurred Background Glow */}
          <div className="absolute inset-0 bg-indigo-200 blur-[40px] rounded-full opacity-60"></div>
          
          <div className="relative bg-white w-24 h-24 rounded-[2rem] shadow-sm border border-zinc-100 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-indigo-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-zinc-900 mb-3 tracking-tight">Zacznijmy budować ofertę</h2>
        <p className="text-zinc-500 mb-10 max-w-sm text-center leading-relaxed">
          Twój katalog usług jest jeszcze pusty. Dodaj swoją pierwszą usługę, aby zacząć prezentować ją klientom.
        </p>
        
        <motion.button
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          onClick={() => setIsEmpty(false)} // For demo purposes
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-[0_8px_20px_rgb(79,70,229,0.25)]"
        >
          <Plus className="w-5 h-5" />
          Dodaj pierwszą usługę
        </motion.button>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="w-full max-w-5xl">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Usługi</h1>
          <p className="text-zinc-500 mt-1">Zarządzaj swoją ofertą i cennikiem.</p>
        </div>
        <button className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95">
          <Plus className="w-4 h-4" />
          Dodaj usługę
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="group block bg-white border border-zinc-200 p-4 rounded-xl hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-200 cursor-pointer relative"
          >
             <div className="flex items-center justify-between">
              
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8 flex-1 pl-2">
                
                {/* Name */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-zinc-800">{service.name}</h3>
                </div>
                
                <div className="flex items-center justify-start md:justify-end gap-6 md:gap-10 flex-1">
                  {/* Category Badge */}
                  <div className="min-w-[100px]">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-zinc-50 text-zinc-600 border border-zinc-100 shadow-sm">
                      {service.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="min-w-[120px] text-zinc-600 font-medium text-sm">
                    {service.price}
                  </div>

                   {/* Status Badge */}
                  <div className="min-w-[120px]">
                    {service.status === "Opublikowano" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Opublikowano
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                         <Clock className="w-3.5 h-3.5" />
                        Szkic
                      </span>
                    )}
                  </div>
                </div>
              </div>

               {/* Quick Actions (Hover Fade-in) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-end absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white via-white to-transparent pl-8 md:static md:translate-y-0 md:bg-transparent md:pl-0 md:min-w-[80px]">
                <button 
                  className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Edytuj"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors ml-1"
                  title="Więcej opcji"
                >
                   <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Helper to toggle the Empty State view during presentation */}
      <div className="mt-12 text-center">
        <button 
          onClick={() => setIsEmpty(true)} 
          className="text-xs font-medium text-zinc-400 hover:text-zinc-600 border border-zinc-200 hover:border-zinc-300 rounded-lg px-3 py-1.5 transition-colors"
        >
          Symuluj pusty stan
        </button>
      </div>
    </div>
  );
}
