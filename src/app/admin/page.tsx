export default function AdminDashboard() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">Dashboard</h1>
      <p className="text-zinc-500 mb-8 max-w-2xl leading-relaxed">
        Witaj w panelu zarządzania Digitay CMS. Tutaj znajdziesz podsumowanie swojej działalności i szybki dostęp do najważniejszych funkcji.
      </p>
      
      {/* Przykładowe karty statystyk jako placeholder dla zawartości */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:border-zinc-200 transition-colors">
          <h3 className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Unikalni Klienci
          </h3>
          <p className="text-3xl font-semibold text-zinc-900">24</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:border-zinc-200 transition-colors">
          <h3 className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            Aktywne Usługi
          </h3>
          <p className="text-3xl font-semibold text-zinc-900">12</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-50/50 border border-zinc-100 hover:border-zinc-200 transition-colors">
          <h3 className="text-sm font-medium text-zinc-500 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            Nowe Wiadomości
          </h3>
          <p className="text-3xl font-semibold text-zinc-900">5</p>
        </div>
      </div>
    </div>
  );
}
