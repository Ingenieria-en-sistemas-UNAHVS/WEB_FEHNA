import { ABOUT_BLOCKS } from "../data/about-content";
import type { AboutBlock } from "../types/about.types";

interface IdentitySectionProps {
  /** Bloques narrativos a mostrar. Por defecto, los del contenido base. */
  bloques?: AboutBlock[];
}

// Bloques de texto institucional: qué es la federación y qué hace.
export function IdentitySection({ bloques = ABOUT_BLOCKS }: IdentitySectionProps) {
  if (bloques.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 grid gap-12 md:grid-cols-2">
        {bloques.map((b) => (
          <article key={b.id}>
            <h2
              className="text-3xl font-black text-white uppercase mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {b.titulo}
            </h2>
            <div className="flex flex-col gap-3">
              {b.parrafos.map((p, i) => (
                <p
                  key={`${b.id}-${i}`}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
