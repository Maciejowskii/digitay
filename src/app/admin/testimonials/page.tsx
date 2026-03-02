"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Star, CheckCircle2 } from "lucide-react";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { deleteTestimonial } from "./actions";
import Image from "next/image";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     fetchData();
  }, []);

  const fetchData = async () => {
     setIsLoading(true);
     // Simulate fetch latency - in a real app import the Drizzle initial values passed from Server Component
     setTimeout(() => {
        setTestimonials([
          {
            id: 1,
            authorName: "Anna Kowalska",
            authorRole: "CEO",
            company: "TechCorp",
            content: "Niesamowita współpraca. Zespół dostarczył projekt przed czasem i znacznie powyżej naszych oczekiwań. Po prostu mistrzostwo.",
            rating: 5,
            isFeatured: true,
            avatarUrl: ""
          },
          {
            id: 2,
            authorName: "Jan Nowak",
            authorRole: "Dyrektor Marketingu",
            company: "RetailX",
            content: "Dzięki ich interwencji nasz współczynnik konwersji wzrósł o niemal 200%. Gorąco polecam wszystkim niezdecydowanym.",
            rating: 4,
            isFeatured: false,
            avatarUrl: ""
          }
        ]);
        setIsLoading(false);
     }, 400);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć tę opinię?")) {
      await deleteTestimonial(id);
      fetchData(); // Reload
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleSuccess = () => {
    closeForm();
    alert("Zapisano pomyślnie! Odśwież stronę, aby zobaczyć zmiany w bazie.");
    fetchData();
  };

  return (
    <div className="w-full max-w-5xl">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Opinie Klientów</h1>
          <p className="text-zinc-500 mt-1">Zarządzaj opiniami wyświetlanymi na stronie głównej.</p>
        </div>
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)} className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95">
            <Plus className="w-4 h-4" />
            Dodaj opinię
          </button>
        )}
      </div>

      {isFormOpen ? (
        <TestimonialForm initialData={editingItem} onSuccess={handleSuccess} onCancel={closeForm} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="p-8 col-span-full text-center text-zinc-500">Ładowanie opinii...</div>
          ) : testimonials.length === 0 ? (
            <div className="p-8 col-span-full text-center text-zinc-500 bg-zinc-50 rounded-xl">Brak dodanych opinii.</div>
          ) : (
             testimonials.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col bg-white border border-zinc-200 p-6 rounded-xl hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-200 relative min-h-[200px]"
                >
                  
                  {/* Rating & Featured badge */}
                  <div className="flex justify-between items-center mb-4 border-b pb-4">
                     <div className="flex gap-1">
                       {Array.from({ length: item.rating || 5 }).map((_, i) => (
                         <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                       ))}
                     </div>
                     {item.isFeatured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Wyróżniona
                        </span>
                     )}
                  </div>

                  {/* Content Preview */}
                  <p className="text-zinc-600 text-sm italic mb-6 flex-1 line-clamp-3">
                    "{item.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between mt-auto">
                     <div className="flex gap-3 items-center">
                       <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0">
                         {item.avatarUrl ? (
                            <Image src={item.avatarUrl} fill alt="avatar" className="object-cover" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold bg-indigo-50 text-indigo-700">{item.authorName.charAt(0)}</div>
                         )}
                       </div>
                       <div>
                         <h3 className="text-sm font-bold text-zinc-900 leading-none">{item.authorName}</h3>
                         <p className="text-xs text-zinc-500 mt-1">{item.authorRole} {item.company && `@ ${item.company}`}</p>
                       </div>
                     </div>

                     {/* Actions (Hover) */}
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                        <button onClick={() => handleEdit(item)} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>

                </div>
             ))
          )}
        </div>
      )}
    </div>
  );
}
