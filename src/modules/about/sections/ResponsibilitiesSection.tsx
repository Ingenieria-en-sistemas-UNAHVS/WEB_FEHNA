import { RESPONSIBILIDADES } from "../data/responsibilities";
import { ResponsibilityCard } from "../components/ResponsibilityCard";
import type { Responsibility } from "../types/about.types";

interface ResponsibilitiesSectionProps {
  responsabilidades?: Responsibility[];
}

// De qué se encarga la federación, en cards.
export function ResponsibilitiesSection({
  responsabilidades = RESPONSIBILIDADES,
}: ResponsibilitiesSectionProps) {
  if (responsabilidades.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <h2
          className="text-3xl font-black text-white uppercase mb-8"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          De qué se encarga
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {responsabilidades.map((r) => (
            <ResponsibilityCard key={r.id} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
