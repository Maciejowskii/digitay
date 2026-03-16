"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { saveTestimonial } from "@/app/admin/testimonials/actions";
import { Loader2, X } from "lucide-react";

const testimonialSchema = z.object({
  id: z.number().optional(),
  authorName: z.string().min(1, "Autor jest wymagany"),
  authorRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  content: z.string().min(1, "Treść jest wymagana"),
  avatarUrl: z.string().nullable().optional(),
  rating: z.coerce.number().min(1).max(5).default(5),
  isFeatured: z.boolean().default(false)
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export function TestimonialForm({ 
  initialData, 
  onSuccess,
  onCancel
}: { 
  initialData?: any; 
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      authorRole: initialData.authorRole || "",
      company: initialData.company || "",
      avatarUrl: initialData.avatarUrl || "",
    } : {
      authorName: "",
      authorRole: "",
      company: "",
      content: "",
      avatarUrl: "",
      rating: 5,
      isFeatured: false
    }
  });

  const onSubmit = async (values: TestimonialFormValues) => {
    const res = await saveTestimonial(values);
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

      <h2 className="text-xl font-bold mb-6 text-zinc-900">{initialData ? "Edytuj Opinię" : "Nowa Opinia"}</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Autor</label>
              <input {...form.register("authorName")} className="w-full bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 rounded-lg px-3 py-2 text-sm" placeholder="Jan Kowalski" />
              {form.formState.errors.authorName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.authorName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Stanowisko</label>
              <input {...form.register("authorRole")} className="w-full bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 rounded-lg px-3 py-2 text-sm" placeholder="CEO" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Firma</label>
              <input {...form.register("company")} className="w-full bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 rounded-lg px-3 py-2 text-sm" placeholder="ACME Corp" />
            </div>
          </div>
          <div className="space-y-4">
             <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Ocena (1-5)</label>
              <select {...form.register("rating")} className="w-full bg-white border border-zinc-300 text-zinc-900 rounded-lg px-3 py-2 text-sm">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800">Avatar URL</label>
              <input {...form.register("avatarUrl")} className="w-full bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
            </div>
            
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="isFeatured" {...form.register("isFeatured")} className="w-4 h-4 accent-indigo-600" />
              <label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer text-zinc-800">Wyróżniona opinia</label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-800">Treść opinii</label>
          <textarea {...form.register("content")} className="w-full bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 rounded-lg px-3 py-2 text-sm h-32" placeholder="Niesamowita robota..." />
          {form.formState.errors.content && <p className="text-red-500 text-xs mt-1">{form.formState.errors.content.message}</p>}
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
