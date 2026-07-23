// =====================================================================
// AdminPanel (FEHNA) — shell del panel de administración
// ---------------------------------------------------------------------
// Punto de entrada tras iniciar sesión. Muestra el perfil, un resumen
// de conteos de la base y accesos a los módulos de gestión. Las
// secciones de escritura quedan protegidas por RLS en la base de datos.
// =====================================================================
import { useEffect, useState } from "react";
import {
  LogOut,
  Users,
  Building2,
  CalendarDays,
  Timer,
  Newspaper,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/auth/AuthProvider";

interface Conteos {
  deportistas: number;
  clubes: number;
  eventos: number;
  tiempos: number;
  noticias: number;
}

const MODULOS = [
  { key: "deportistas", label: "Deportistas", icon: Users, desc: "Alta y edición de atletas" },
  { key: "clubes", label: "Clubes", icon: Building2, desc: "Clubes afiliados" },
  { key: "eventos", label: "Eventos", icon: CalendarDays, desc: "Competencias y calendario" },
  { key: "tiempos", label: "Tiempos", icon: Timer, desc: "Registro de marcas" },
  { key: "noticias", label: "Noticias", icon: Newspaper, desc: "Publicaciones del sitio", soloAdmin: true },
] as const;

export default function AdminPanel() {
  const { perfil, esAdmin, cerrarSesion } = useAuth();
  const [conteos, setConteos] = useState<Conteos | null>(null);

  useEffect(() => {
    let activo = true;
    async function cargar() {
      const tablas = ["deportistas", "clubes", "eventos", "tiempos", "noticias"] as const;
      const resultados = await Promise.all(
        tablas.map((t) =>
          supabase.from(t).select("*", { count: "exact", head: true })
        )
      );
      if (!activo) return;
      const c = {} as Conteos;
      tablas.forEach((t, i) => {
        c[t] = resultados[i].count ?? 0;
      });
      setConteos(c);
    }
    cargar();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Barra superior */}
      <header className="border-b border-white/10 bg-[#061529]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                <circle cx="20" cy="20" r="18" fill="#061529" />
                <path d="M8 22 Q14 16 20 22 Q26 28 32 22" stroke="#00C8E0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M8 18 Q14 12 20 18 Q26 24 32 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div
                className="text-white font-bold text-sm leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
              >
                PANEL FEHNA
              </div>
              <div className="text-accent text-xs leading-none mt-0.5">Administración</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white text-sm leading-none">{perfil?.nombre}</div>
              <div className="text-white/40 text-xs leading-none mt-0.5 inline-flex items-center gap-1">
                {esAdmin && <ShieldCheck size={11} className="text-accent" />}
                {perfil?.rol}
              </div>
            </div>
            <button
              onClick={cerrarSesion}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 rounded text-xs text-white/70 hover:border-red-400/50 hover:text-red-300 transition-colors"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1
          className="text-4xl font-black text-white uppercase mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Bienvenido, {perfil?.nombre?.split(" ")[0]}
        </h1>
        <p className="text-white/50 text-sm mb-10">
          Resumen general del sistema FEHNA.
        </p>

        {/* Resumen de conteos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {MODULOS.map(({ key, label, icon: Icon }) => (
            <div key={key} className="bg-card border border-white/5 rounded-xl p-5">
              <Icon size={18} className="text-accent mb-3" />
              <div
                className="text-3xl font-black text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {conteos ? conteos[key as keyof Conteos] : "—"}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Accesos a módulos */}
        <h2
          className="text-xl font-black text-white uppercase mb-4"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Gestión
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULOS.filter((m) => !("soloAdmin" in m && m.soloAdmin) || esAdmin).map(
            ({ key, label, icon: Icon, desc }) => (
              <button
                key={key}
                className="text-left bg-card border border-white/5 rounded-xl p-5 hover:border-accent/40 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded bg-accent/10 flex items-center justify-center">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <span className="text-white font-semibold group-hover:text-accent transition-colors">
                    {label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </button>
            )
          )}

          {/* Solo admin: gestión de usuarios */}
          {esAdmin && (
            <button className="text-left bg-card border border-accent/20 rounded-xl p-5 hover:border-accent/50 transition-all duration-200 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded bg-accent/10 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-accent" />
                </div>
                <span className="text-white font-semibold group-hover:text-accent transition-colors">
                  Usuarios
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Gestión de perfiles y roles (solo admin)
              </p>
            </button>
          )}
        </div>

        <p className="text-white/30 text-xs mt-12">
          Los módulos de gestión están listos para conectarse a formularios CRUD.
          Toda escritura queda validada por las políticas RLS de la base de datos.
        </p>
      </main>
    </div>
  );
}
