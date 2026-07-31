import type { Milestone } from "../types/about.types";

// Hito de la línea de tiempo. El año es opcional.
export function MilestoneItem({ anio, titulo, descripcion }: Milestone) {
  return (
    <li className="relative pl-8 pb-8 last:pb-0 border-l border-white/10 last:border-transparent">
      <span className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background" />

      {anio && (
        <div
          className="text-accent text-2xl font-black leading-none mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {anio}
        </div>
      )}

      <h3 className="text-white font-bold mb-1">{titulo}</h3>

      {descripcion && (
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          {descripcion}
        </p>
      )}
    </li>
  );
}
