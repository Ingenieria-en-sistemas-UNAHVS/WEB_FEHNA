import { RESPONSIBILITY_ICONS } from "../config/responsibility-icons";
import type { Responsibility } from "../types/about.types";

// Card de un área de responsabilidad de la federación.
export function ResponsibilityCard({
  titulo,
  descripcion,
  icono,
}: Responsibility) {
  const Icon = RESPONSIBILITY_ICONS[icono];

  return (
    <div className="bg-card rounded-xl border border-white/10 p-6 hover:border-accent/40 transition-colors duration-200">
      <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center mb-4">
        <Icon size={16} className="text-accent" />
      </div>
      <h3
        className="text-xl font-black text-white uppercase mb-2"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {titulo}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {descripcion}
      </p>
    </div>
  );
}
