"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, Clock } from "lucide-react";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { deleteCaseStudy } from "./actions";
import Image from "next/image";

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from the API route or Server Component data - for CMS Client we can fetch directly 
  // if we set up a simple API route, but to keep it simple we'll simulate fetching for now
  // In a real app we'd pass initialData from a Server Component wrapped around this Client Component.
  useEffect(() => {
     fetchData();
  }, []);

  const fetchData = async () => {
     setIsLoading(true);
     // Simulate fetch latency
     setTimeout(() => {
        setStudies([
          {
            id: 1,
            slug: "kampania-meta-xyz",
            clientName: "XYZ Corp",
            title: "Wzrost ROAS o 300%",
            isPublished: true,
            tags: ["Ads", "E-commerce"],
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
          }
        ]);
        setIsLoading(false);
     }, 500);
  };

  const handleEdit = (caseStudy: any) => {
    setEditingCase(caseStudy);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć to case study?")) {
      await deleteCaseStudy(id);
      fetchData(); // Reload
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCase(null);
  };

  const handleSuccess = () => {
    closeForm();
    // Simulate refresh for the mock state, in reality Server Action + revalidatePath handles standard reload
    alert("Zapisano pomyślnie! Odśwież stronę, aby zobaczyć zmiany w bazie (w pełnej aplkacji zadziała auto-odświeżanie Server Actions).");
    fetchData();
  };

  return (
    <div className="w-full max-w-5xl">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Case Studies</h1>
          <p className="text-zinc-500 mt-1">Zarządzaj zrealizowanymi projektami portfelowymi.</p>
        </div>
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)} className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95">
            <Plus className="w-4 h-4" />
            Dodaj projekt
          </button>
        )}
      </div>

      {isFormOpen ? (
        <CaseStudyForm initialData={editingCase} onSuccess={handleSuccess} onCancel={closeForm} />
      ) : (
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="p-8 text-center text-zinc-500">Ładowanie portfolio...</div>
          ) : studies.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 bg-zinc-50 rounded-xl">Brak dodanych projektów.</div>
          ) : (
             studies.map((study) => (
                <div
                  key={study.id}
                  className="group flex flex-col md:flex-row md:items-center bg-white border border-zinc-200 p-4 rounded-xl hover:border-zinc-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-200"
                >
                  <div className="flex gap-4 flex-1 items-center">
                     <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                       {study.coverImage ? (
                          <Image src={study.coverImage} fill alt="cover" className="object-cover" />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs text-center border">Brak zdjęcia</div>
                       )}
                     </div>
                     <div>
                       <h3 className="text-sm font-semibold text-zinc-900">{study.title}</h3>
                       <p className="text-xs text-zinc-500">{study.clientName}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 md:mt-0 justify-between md:justify-end flex-1 md:pr-4">
                     <div className="flex gap-1 flex-wrap hidden md:flex">
                        {(study.tags || []).slice(0,2).map((tag: string, i: number) => (
                          <span key={i} className="text-[10px] uppercase font-mono bg-zinc-100 text-zinc-500 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                     </div>
                     <div className="min-w-[120px]">
                        {study.isPublished ? (
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
                      
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleEdit(study)} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(study.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
