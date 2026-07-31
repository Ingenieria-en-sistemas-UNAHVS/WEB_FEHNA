import { CLASIFICACIONES_MOCK } from "./data/classifications.mock";
import { ClassificationCard } from "./components/ClassificationCard";
import type { SwimmingClassification } from "./types/classification.types";

interface SwimmingClassificationsSectionProps {
  /** Clasificaciones a mostrar. Por defecto usa el mock; a futuro, datos reales. */
  clasificaciones?: SwimmingClassification[];
}

export function SwimmingClassificationsSection({
  clasificaciones = CLASIFICACIONES_MOCK,
}: SwimmingClassificationsSectionProps) {
  // Sin clasificaciones no hay nada que destacar: la sección no se renderiza.
  if (clasificaciones.length === 0) return null;

  return (
    <section id="clasificaciones" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Piscina larga · 50 m
          </div>
          <h2
            className="text-5xl font-black text-white uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Clasificaciones de Nado
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed max-w-xl mx-auto">
            La federación compite en pruebas de piscina larga. Estos son los
            cuatro estilos oficiales del calendario nacional, cada uno con su
            propia técnica y reglamento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {clasificaciones.map((c) => (
            <ClassificationCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
