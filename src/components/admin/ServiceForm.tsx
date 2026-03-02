"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/actions/services";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

type ServiceData = {
  id?: number;
  name: string;
  slug: string;
  description: string | null;
  basePrice: string | null;
  isPublished: boolean;
  iconName: string | null;
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ServiceForm({ initialData }: { initialData?: ServiceData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData?.id;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    basePrice: initialData?.basePrice || "",
    isPublished: initialData?.isPublished ?? false,
    iconName: initialData?.iconName || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const val = type === "checkbox" ? target.checked : value;

    setFormData((prev) => ({ 
      ...prev, 
      [name]: val,
      ...(name === "name" && !isEditing 
          ? { slug: generateSlug(value) } 
          : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const payload = {
          name: formData.name,
          slug: formData.slug,
          description: formData.description || null,
          basePrice: formData.basePrice || null,
          isPublished: formData.isPublished,
          iconName: formData.iconName || null,
        };

        if (isEditing && initialData.id) {
          await updateService(initialData.id, payload);
          alert("Usługa zaktualizowana pomyślnie.");
        } else {
          await createService(payload);
          alert("Usługa utworzona pomyślnie.");
        }
        
        router.push("/admin/services");
      } catch (error: any) {
        alert(error.message || "Wystąpił błąd zapisu.");
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/services"
          className="p-2 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-black text-zinc-900 uppercase tracking-tighter">
            {isEditing ? `Edycja Usługi` : "Nowa Usługa"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-zinc-200 shadow-sm relative">
        {isPending && (
          <div className="absolute inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
          </div>
        )}

        <div className="space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">Informacje o Usłudze</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Nazwa Usługi</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                placeholder="Np. Aplikacje Mobile"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Slug (URL)</label>
              <input
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors font-mono text-xs"
                placeholder="Np. aplikacje-mobile"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Opis Usługi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                placeholder="Krótki tekst opisujący na czym to polega..."
              />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900">Cena Bazowa</label>
                <input
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                  placeholder="Np. od 5 000 PLN"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900">Ikona (nazwa dla Lucide, np. Smartphone)</label>
                <input
                   name="iconName"
                   value={formData.iconName}
                   onChange={handleChange}
                   className="w-full p-3 border border-zinc-200 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                   placeholder="Smartphone, Monitor, PenTool..."
                />
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-5 h-5 rounded-none border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <label htmlFor="isPublished" className="text-sm font-bold text-zinc-900 cursor-pointer">
                  Opublikuj od razu (widoczne na stronie)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8 border-t border-zinc-100 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isEditing ? "Aktualizuj usługę" : "Zapisz usługę"}
          </button>
        </div>
      </form>
    </div>
  );
}
