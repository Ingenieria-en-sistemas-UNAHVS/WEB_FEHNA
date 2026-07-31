import { User } from "lucide-react";
import type { Authority } from "../types/about.types";

// Iniciales del nombre, para el avatar cuando no hay foto.
function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
}

// Card de una autoridad. Sin `nombre` se muestra como pendiente, para que
// la sección conserve su forma mientras la federación confirma los datos.
export function AuthorityCard({ nombre, cargo, fotoUrl, periodo }: Authority) {
  const pendiente = !nombre?.trim();

  return (
    <div className="bg-card rounded-xl border border-white/10 p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary border border-white/10 flex items-center justify-center mb-4">
        {fotoUrl ? (
          <img
            src={fotoUrl}
            alt={nombre ?? cargo}
            className="w-full h-full object-cover"
          />
        ) : nombre ? (
          <span
            className="text-2xl font-black text-accent"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {iniciales(nombre)}
          </span>
        ) : (
          <User size={24} className="text-white/20" />
        )}
      </div>

      <div className="text-accent text-xs tracking-widest uppercase mb-1">
        {cargo}
      </div>

      <div
        className={`text-lg font-bold ${pendiente ? "text-white/30" : "text-white"}`}
      >
        {pendiente ? "Por confirmar" : nombre}
      </div>

      {periodo && (
        <div className="text-muted-foreground text-xs mt-1">{periodo}</div>
      )}
    </div>
  );
}
