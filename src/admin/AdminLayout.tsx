// =====================================================================
// AdminLayout (FEHNA) — shell del panel: barra superior + navegación
// lateral. Selecciona el módulo según la ruta (mini-router propio).
// =====================================================================
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarDays,
  Timer,
  Newspaper,
  UserCog,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "@/lib/router";
import { useAuth } from "@/auth/AuthProvider";

import Dashboard from "./modules/Dashboard";
import ClubesAdmin from "./modules/ClubesAdmin";
import DeportistasAdmin from "./modules/DeportistasAdmin";
import EventosAdmin from "./modules/EventosAdmin";
import TiemposAdmin from "./modules/TiemposAdmin";
import NoticiasAdmin from "./modules/NoticiasAdmin";
import UsuariosAdmin from "./modules/UsuariosAdmin";

const NAV = [
  { ruta: "/admin", label: "Panel", icon: LayoutDashboard },
  { ruta: "/admin/clubes", label: "Clubes", icon: Building2 },
  { ruta: "/admin/deportistas", label: "Deportistas", icon: Users },
  { ruta: "/admin/eventos", label: "Eventos", icon: CalendarDays },
  { ruta: "/admin/tiempos", label: "Tiempos", icon: Timer },
  { ruta: "/admin/noticias", label: "Noticias", icon: Newspaper, soloAdmin: true },
  { ruta: "/admin/usuarios", label: "Usuarios", icon: UserCog, soloAdmin: true },
] as const;

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { perfil, esAdmin, cerrarSesion } = useAuth();

  function Modulo() {
    switch (pathname) {
      case "/admin/clubes": return <ClubesAdmin />;
      case "/admin/deportistas": return <DeportistasAdmin />;
      case "/admin/eventos": return <EventosAdmin />;
      case "/admin/tiempos": return <TiemposAdmin />;
      case "/admin/noticias":
        return esAdmin ? <NoticiasAdmin /> : <SinPermiso />;
      case "/admin/usuarios":
        return esAdmin ? <UsuariosAdmin /> : <SinPermiso />;
      default: return <Dashboard />;
    }
  }

  const nav = NAV.filter((n) => !("soloAdmin" in n && n.soloAdmin) || esAdmin);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Barra superior */}
      <header className="border-b border-white/10 bg-[#061529] shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <circle cx="20" cy="20" r="18" fill="#061529" />
                <path d="M8 22 Q14 16 20 22 Q26 28 32 22" stroke="#00C8E0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M8 18 Q14 12 20 18 Q26 24 32 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
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
        {/* Navegación lateral */}
        <nav className="w-16 sm:w-56 border-r border-white/10 bg-[#04101f] shrink-0 py-4">
          {nav.map(({ ruta, label, icon: Icon }) => {
            const activo = pathname === ruta;
            return (
              <Link
                key={ruta}
                to={ruta}
                className={`flex items-center gap-3 px-4 sm:px-5 py-3 text-sm transition-colors ${
                  activo ? "text-accent bg-accent/10 border-r-2 border-accent" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={17} className="shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <Link to="/" className="flex items-center gap-3 px-4 sm:px-5 py-3 text-sm text-white/40 hover:text-white/70 mt-4">
            <span className="hidden sm:inline">← Volver al sitio</span>
            <span className="sm:hidden">←</span>
          </Link>
        </nav>

        {/* Contenido */}
        <main className="flex-1 min-w-0 p-5 sm:p-8 overflow-x-auto">
          <Modulo />
        </main>
      </div>
    </div>
  );
}

function SinPermiso() {
  return (
    <div className="text-center py-16 text-white/50 text-sm">
      Esta sección es solo para administradores.
    </div>
  );
}
