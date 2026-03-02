"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, MoreHorizontal, Edit2, CheckCircle2, Clock, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteService } from "@/actions/services";

type ServiceType = {
  id: number;
  name: string;
  slug: string;
  category?: string; // We'll map iconName as Category conceptually for the UI or just skip
  basePrice: string | null;
  isPublished: boolean;
};

export default function ServicesClient({ services }: { services: ServiceType[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć tę usługę?")) {
      startTransition(async () => {
        try {
          await deleteService(id);
        } catch (error) {
          alert("Wystąpił błąd podczas usuwania usługi.");
        }
      });
    }
  };

  // --- EMPTY STATE ---
  if (services.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-12rem)] min-h-[400px] flex flex-col items-center justify-center p-8 bg-white border border-zinc-200">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full opacity-60"></div>
          <div className="relative bg-zinc-900 w-24 h-24 rounded-none shadow-sm flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <h2 className="text-3xl font-heading font-black text-zinc-900 mb-3 tracking-tighter uppercase">Zacznijmy budować ofertę</h2>
        <p className="text-zinc-500 mb-10 max-w-sm text-center leading-relaxed font-mono text-sm">
          Twój katalog usług jest jeszcze pusty. Dodaj swoją pierwszą usługę, aby zacząć prezentować ją klientom.
        </p>
        
        <Link
          href="/admin/services/nowa"
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3.5 rounded-none font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          DODAJ PIERWSZĄ USŁUGĘ
        </Link>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="w-full max-w-5xl relative">
       {isPending && (
          <div className="absolute inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
          </div>
       )}

       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
           <h1 className="text-3xl font-heading font-black text-zinc-900 tracking-tighter uppercase">Usługi</h1>
           <p className="text-zinc-500 mt-1 font-medium">Zarządzaj swoją ofertą i cennikiem.</p>
        </div>
        <Link 
          href="/admin/services/nowa"
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-none font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          DODAJ USŁUGĘ
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="group block bg-white border border-zinc-200 p-4 rounded-none hover:border-zinc-300 transition-all duration-200 relative"
          >
             <div className="flex items-center justify-between">
              
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8 flex-1 pl-2">
                
                {/* Name */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-primary transition-colors">{service.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">/{service.slug}</p>
                </div>
                
                <div className="flex items-center justify-start md:justify-end gap-6 md:gap-10 flex-1">
                  
                  {/* Price */}
                  <div className="min-w-[120px] text-zinc-900 font-bold font-mono text-sm">
                    {service.basePrice || "Wycena ind."}
                  </div>

                   {/* Status Badge */}
                  <div className="min-w-[120px]">
                    {service.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        PUBLIKACJA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-200">
                         <Clock className="w-3.5 h-3.5" />
                        SZKIC
                      </span>
                    )}
                  </div>
                </div>
              </div>

               {/* Quick Actions (Hover Fade-in) */}
              <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-end absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white md:bg-transparent pl-4 md:pl-0">
                <Link 
                  href={`/admin/services/edytuj/${service.id}`}
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-300"
                  title="Edytuj"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => handleDelete(service.id)}
                  disabled={isPending}
                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1 border border-transparent hover:border-red-200 disabled:opacity-50"
                  title="Usuń usługę"
                >
                   <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
