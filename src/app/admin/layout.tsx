import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin | Digitay CMS",
  description: "Panel zarządzania treścią agencji Digitay",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-zinc-50 p-4 md:p-6 flex gap-6 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full h-full rounded-2xl">
        {/* Kontener "island" na zawartość */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-zinc-100 min-h-full p-8 w-full max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
