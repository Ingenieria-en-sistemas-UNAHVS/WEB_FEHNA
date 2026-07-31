import { AUTORIDADES } from "../data/authorities";
import { AuthorityCard } from "../components/AuthorityCard";
import type { Authority } from "../types/about.types";

interface AuthoritiesSectionProps {
  autoridades?: Authority[];
}

// Principales encargados de la federación.
export function AuthoritiesSection({
  autoridades = AUTORIDADES,
}: AuthoritiesSectionProps) {
  if (autoridades.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <h2
          className="text-3xl font-black text-white uppercase mb-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Principales encargados
        </h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-2xl">
          Junta directiva de la federación.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {autoridades.map((a) => (
            <AuthorityCard key={a.id} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}
