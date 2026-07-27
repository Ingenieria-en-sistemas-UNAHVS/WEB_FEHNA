"use client";

import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarDays,
  Timer,
  Newspaper,
  Handshake,
  Phone,
  UserCog,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";

const NAV = [
  { ruta: "/admin", label: "Panel", icon: LayoutDashboard },
  { ruta: "/admin/clubes", label: "Clubes", icon: Building2 },
  { ruta: "/admin/deportistas", label: "Deportistas", icon: Users },
  { ruta: "/admin/eventos", label: "Eventos", icon: CalendarDays },
  { ruta: "/admin/tiempos", label: "Tiempos", icon: Timer },
  { ruta: "/admin/noticias", label: "Noticias", icon: Newspaper, soloAdmin: true },
  { ruta: "/admin/patrocinadores", label: "Patrocinadores", icon: Handshake, soloAdmin: true },
  { ruta: "/admin/contacto", label: "Contáctanos", icon: Phone, soloAdmin: true },
  { ruta: "/admin/usuarios", label: "Usuarios", icon: UserCog, soloAdmin: true },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { perfil, esAdmin, cerrarSesion } = useAuth();

  const nav = NAV.filter((n) => !("soloAdmin" in n && n.soloAdmin) || esAdmin);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <header className="border-b border-white/10 bg-[#061529] shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
              <img src="/favicon.png" alt="Logo FEHNA" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>PANEL FEHNA</div>
              <div className="text-accent text-xs leading-none mt-0.5">Administración</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white text-sm leading-none">{perfil?.nombre}</div>
              <div className="text-white/40 text-xs leading-none mt-0.5 inline-flex items-center gap-1">
                {esAdmin && <ShieldCheck size={11} className="text-accent" />}{perfil?.rol}
              </div>
            </div>
            <button onClick={cerrarSesion} className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 rounded text-xs text-white/70 hover:border-red-400/50 hover:text-red-300 transition-colors">
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <nav className="w-16 sm:w-56 border-r border-white/10 bg-[#04101f] shrink-0 py-4">
          {nav.map(({ ruta, label, icon: Icon }) => {
            const activo = pathname === ruta;
            return (
              <Link
                key={ruta}
                href={ruta}
                className={`flex items-center gap-3 px-4 sm:px-5 py-3 text-sm transition-colors ${
                  activo ? "text-accent bg-accent/10 border-r-2 border-accent" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={17} className="shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <Link href="/" className="flex items-center gap-3 px-4 sm:px-5 py-3 text-sm text-white/40 hover:text-white/70 mt-4">
            <span className="hidden sm:inline">← Volver al sitio</span>
            <span className="sm:hidden">←</span>
          </Link>
        </nav>

        <main className="flex-1 min-w-0 p-5 sm:p-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
