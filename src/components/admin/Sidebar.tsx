"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Settings,
  ChevronDown,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

// Nav items definition
const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogi", href: "/admin/blog", icon: FileText },
  { name: "Nowy Wpis (AI)", href: "/admin/blog/new", icon: LayoutDashboard },
  { name: "Ustawienia", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
  };

  return (
    <aside className="w-64 h-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between py-6 px-4 border border-zinc-100 overflow-y-auto">
      {/* Logo Area */}
      <div>
        <div className="flex items-center px-4 mb-8">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center mr-3 shadow-sm">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-zinc-900">
            Digitay CMS
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.href === pathname;

            return (
              <div key={item.name} className="relative">
                <Link
                  href={item.href!}
                  onMouseEnter={() => setHoveredPath(item.name)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors z-10 ${
                    isActive ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-zinc-400"}`} />
                  <span className="relative z-10">{item.name}</span>
                  {hoveredPath === item.name && !isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-zinc-100/80 rounded-xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Dropdown */}
      <div className="relative mt-8">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden border border-indigo-200">
              M
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-zinc-900">Maciej</span>
              <span className="text-xs text-zinc-500">Admin</span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              userMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {userMenuOpen && (
             <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             transition={{ duration: 0.15, ease: "easeOut" }}
             className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100 py-2 overflow-hidden z-20"
           >
             <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors">
               <UserIcon className="w-4 h-4" />
               Mój Profil
             </button>
             <div className="h-px bg-zinc-100 my-1 mx-4" />
             <button
               onClick={handleLogout}
               disabled={isLoggingOut}
               className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
             >
               <LogOut className="w-4 h-4" />
               {isLoggingOut ? "Wylogowywanie..." : "Wyloguj"}
             </button>
           </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
