// Panel principal — resumen de conteos con accesos a los módulos.
import { useEffect, useState } from "react";
import { Users, Building2, CalendarDays, Timer, Newspaper, UserCog } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/auth/AuthProvider";
import { Link } from "@/lib/router";

const TARJETAS = [
  { tabla: "clubes", label: "Clubes", ruta: "/admin/clubes", icon: Building2 },
  { tabla: "deportistas", label: "Deportistas", ruta: "/admin/deportistas", icon: Users },
  { tabla: "eventos", label: "Eventos", ruta: "/admin/eventos", icon: CalendarDays },
  { tabla: "tiempos", label: "Tiempos", ruta: "/admin/tiempos", icon: Timer },
  { tabla: "noticias", label: "Noticias", ruta: "/admin/noticias", icon: Newspaper, soloAdmin: true },
  { tabla: "perfiles", label: "Usuarios", ruta: "/admin/usuarios", icon: UserCog, soloAdmin: true },
] as const;

export default function Dashboard() {
  const { perfil, esAdmin } = useAuth();
  const [conteos, setConteos] = useState<Record<string, number>>({});

  useEffect(() => {
    let activo = true;
    (async () => {
      const tablas = ["clubes", "deportistas", "eventos", "tiempos", "noticias", "perfiles"];
      const res = await Promise.all(
        tablas.map((t) => supabase.from(t).select("*", { count: "exact", head: true }))
      );
      if (!activo) return;
      const c: Record<string, number> = {};
      tablas.forEach((t, i) => (c[t] = res[i].count ?? 0));
      setConteos(c);
    })();
    return () => { activo = false; };
  }, []);

  const visibles = TARJETAS.filter((t) => !("soloAdmin" in t && t.soloAdmin) || esAdmin);

  return (
    <div>
      <h1 className="text-3xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Bienvenido, {perfil?.nombre?.split(" ")[0]}
      </h1>
      <p className="text-white/50 text-sm mb-8">Resumen general del sistema FEHNA.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {visibles.map(({ tabla, label, ruta, icon: Icon }) => (
          <Link key={tabla} to={ruta} className="bg-card border border-white/5 rounded-xl p-5 hover:border-accent/40 transition-all group">
            <Icon size={18} className="text-accent mb-3" />
            <div className="text-3xl font-black text-white group-hover:text-accent transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {conteos[tabla] ?? "—"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
