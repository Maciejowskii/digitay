import { AIBlogForm } from "./AIBlogForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowy Wpis AI | Digitay CMS",
};

export default function NewAIBlogPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">
          Generator Wpisów AI
        </h1>
        <p className="text-zinc-500">
          Wprowadź temat i wytyczne, a asystent AI przygotuje kompletny, zoptymalizowany pod SEO artykuł z odpowiednimi grafikami i backlinkami.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
        <AIBlogForm />
      </div>
    </div>
  );
}
