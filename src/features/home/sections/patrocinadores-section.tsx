"use client";

import type { PatrocinadorRow } from "@/lib/data/patrocinadores";

interface Props {
  patrocinadores: PatrocinadorRow[];
  visible: boolean;
}

export function PatrocinadoresSection({ patrocinadores, visible }: Props) {
  if (!visible) return null;

  return (
    <section className="py-16 bg-secondary border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-muted-foreground text-xs tracking-widest uppercase">Aliados estratégicos</div>
          <h3 className="text-3xl font-black text-white uppercase mt-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nuestros Patrocinadores</h3>
        </div>
      </div>

      {patrocinadores.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-8 text-white/30 text-sm border border-dashed border-white/10 rounded-xl">
            Aún no hay patrocinadores publicados.
          </div>
        </div>
      ) : (
        <div className="group relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent" />
          <div className="patrocinadores-track flex w-max items-center gap-20 group-hover:[animation-play-state:paused]">
            {[...patrocinadores, ...patrocinadores].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex flex-shrink-0 flex-col items-center justify-center gap-3" style={{ minWidth: 220 }}>
                <img src={p.logo_url} alt={p.nombre} loading="lazy" className="h-24 w-auto max-w-[220px] object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0" />
                <span className="text-lg font-semibold tracking-wide text-white/70 text-center">{p.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes patrocinadoresScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .patrocinadores-track {
          animation: patrocinadoresScroll 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .patrocinadores-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
