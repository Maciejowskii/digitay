"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { saveCaseStudy } from "@/app/admin/case-studies/actions";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import ImageUploadDropzone from "./ImageUploadDropzone";

const caseStudySchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(1, "Slug jest wymagany"),
  clientName: z.string().min(1, "Nazwa klienta jest wymagana"),
  title: z.string().min(1, "Tytuł jest wymagany"),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  coverImage: z.string().optional(),
  isPublished: z.boolean().default(false),
  tags: z.string().transform((val) => val.split(",").map(s => s.trim()).filter(Boolean)),
  results: z.array(
    z.object({
      label: z.string(),
      value: z.string()
    })
  ).optional()
});

type CaseStudyFormInput = z.input<typeof caseStudySchema>;
type CaseStudyFormOutput = z.output<typeof caseStudySchema>;

export function CaseStudyForm({ 
  initialData, 
  onSuccess,
  onCancel
}: { 
  initialData?: any; 
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const form = useForm<CaseStudyFormInput, any, CaseStudyFormOutput>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: initialData ? {
      ...initialData,
      tags: initialData.tags ? (Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags) : "",
      results: initialData.results ? (Array.isArray(initialData.results) ? initialData.results : Object.entries(initialData.results).map(([k, v]) => ({ label: k, value: String(v) }))) : []
    } : {
      slug: "",
      clientName: "",
      title: "",
      challenge: "",
      solution: "",
      coverImage: "",
      isPublished: true,
      tags: "",
      results: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: "results",
    control: form.control,
  });

  const onSubmit = async (values: CaseStudyFormOutput) => {
    // Transform array of objects to simple record for json storage 
    const resultsObj = values.results?.reduce((acc, curr) => {
      if (curr.label && curr.value) acc[curr.label] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const submissionData = {
      ...values,
      results: Object.keys(resultsObj || {}).length > 0 ? resultsObj : null
    };

    const res = await saveCaseStudy(submissionData);
    if (res.success) {
      onSuccess();
    } else {
      alert("Błąd zapisu danych");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm relative">
      <button onClick={onCancel} className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-500">
         <X className="w-5 h-5" />
      </button>

      <h2 className="text-xl font-bold mb-6 text-zinc-900">{initialData ? "Edytuj Case Study" : "Nowe Case Study"}</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Slug (URL)</label>
              <input {...form.register("slug")} className="w-full bg-white border border-zinc-400 text-zinc-900 placeholder:text-zinc-500 rounded-lg px-3 py-2 text-sm" placeholder="np. kampania-meta-2024" />
              {form.formState.errors.slug && <p className="text-red-500 text-xs mt-1">{form.formState.errors.slug.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Nazwa klienta</label>
              <input {...form.register("clientName")} className="w-full bg-white border border-zinc-400 text-zinc-900 placeholder:text-zinc-500 rounded-lg px-3 py-2 text-sm" />
              {form.formState.errors.clientName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.clientName.message}</p>}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Tytuł projektu</label>
              <input {...form.register("title")} className="w-full bg-white border border-zinc-400 text-zinc-900 placeholder:text-zinc-500 rounded-lg px-3 py-2 text-sm" />
              {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Tagi (po przecinku)</label>
              <input {...form.register("tags")} className="w-full bg-white border border-zinc-400 text-zinc-900 placeholder:text-zinc-500 rounded-lg px-3 py-2 text-sm" placeholder="SEO, E-commerce, Design" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-800">Zdjecie okładkowe</label>
          <Controller 
             name="coverImage"
             control={form.control}
             render={({ field }) => (
                <ImageUploadDropzone 
                  value={field.value || ""}
                  onChange={field.onChange}
                />
             )}
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800">Wyzwanie (Challenge)</label>
            <Controller
              name="challenge"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Opisz jakie problemy napotkał klient..."
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800">Rozwiązanie (Solution)</label>
            <Controller
              name="solution"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Opisz architekturę i jak rozwiązaliście problem..."
                />
              )}
            />
          </div>
        </div>

        {/* Dynamic Results builder */}
        <div>
           <div className="flex items-center justify-between mb-2">
             <label className="block text-sm font-medium text-zinc-800">Wyniki (Rezultaty)</label>
             <button type="button" onClick={() => append({ label: "", value: "" })} className="text-xs bg-zinc-100 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-zinc-200">
               <Plus className="w-3 h-3" /> Dodaj wynik
             </button>
           </div>
           
           <div className="space-y-3">
             {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-center">
                  <input {...form.register(`results.${index}.label`)} placeholder="np. Wzrost ruchu" className="flex-1 bg-white border border-zinc-400 text-zinc-900 placeholder:text-zinc-500 rounded-lg px-3 py-2 text-sm" />
                  <input {...form.register(`results.${index}.value`)} placeholder="np. +450%" className="w-32 bg-white border border-zinc-400 text-zinc-900 placeholder:text-zinc-500 rounded-lg px-3 py-2 text-sm" />
                  <button type="button" onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
             ))}
           </div>
        </div>

        <div className="flex items-center gap-3 py-2">
           <input type="checkbox" id="isPublished" {...form.register("isPublished")} className="w-4 h-4 accent-indigo-600" />
           <label htmlFor="isPublished" className="text-sm font-medium cursor-pointer text-zinc-800">Opublikuj publicznie</label>
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-medium border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50">Anuluj</button>
          <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 flex items-center gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
}
