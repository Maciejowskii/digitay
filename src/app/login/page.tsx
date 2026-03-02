"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
        setIsPending(false);
      }
    } catch (err: any) {
      // Allow Next.js to handle the redirect exception!
      if (err?.message === "NEXT_REDIRECT" || err?.digest?.includes("NEXT_REDIRECT")) {
        throw err; 
      }
      console.error("Login failed with unexpected error:", err);
      setError("Wystąpił problem z konfiguracją serwera (np. brak kluczy autoryzacji).");
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Subtle Noise / Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen mix-blend-plus-lighter" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like ease
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
           
           {/* Top accent line */}
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

           <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
             <KeyRound className="w-5 h-5 text-zinc-300" />
           </div>

           <div className="text-center mb-8">
             <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Panel Administracyjny</h1>
             <p className="text-sm text-zinc-500 mt-2">Zaloguj się, aby zarządzać treścią agencji Digitay.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    placeholder="Adres e-mail"
                    className="w-full bg-black/20 border border-white/10 text-zinc-100 placeholder:text-zinc-600 px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="password">Hasło</label>
                  <input 
                    id="password"
                    name="password"
                    type="password" 
                    required
                    placeholder="Hasło dostępowe"
                    className="w-full bg-black/20 border border-white/10 text-zinc-100 placeholder:text-zinc-600 px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                  {error}
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-white text-black hover:bg-zinc-200 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                   <Loader2 className="w-5 h-5 animate-spin text-zinc-600" />
                ) : (
                   <>
                     Autoryzuj dostęp
                     <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                   </>
                )}
              </button>
           </form>
           
           <div className="mt-8 text-center">
              <p className="text-xs text-zinc-600 font-mono tracking-widest uppercase">
                {new Date().getFullYear()} © DIGITAY SECURE
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
