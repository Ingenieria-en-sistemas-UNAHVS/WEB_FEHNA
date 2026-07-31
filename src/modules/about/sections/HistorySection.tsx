import { HITOS } from "../data/milestones";
import { MilestoneItem } from "../components/MilestoneItem";
import type { Milestone } from "../types/about.types";

interface HistorySectionProps {
  hitos?: Milestone[];
}

// Línea de tiempo de la federación. Mientras no haya hitos confirmados,
// la sección no se renderiza en lugar de mostrar contenido inventado.
export function HistorySection({ hitos = HITOS }: HistorySectionProps) {
  if (hitos.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl font-black text-white uppercase mb-8"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Nuestra historia
        </h2>

        <ol className="mt-10">
          {hitos.map((h) => (
            <MilestoneItem key={h.id} {...h} />
          ))}
        </ol>
      </div>
    </section>
  );
}
