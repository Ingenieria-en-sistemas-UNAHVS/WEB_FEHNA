import { CONTACT_CHANNELS } from "../config/contact-channels";
import type { ContactChannelData } from "../types/contact.types";

// Tarjeta de un canal con sus entradas.
export function ContactCard({ canal, entradas }: ContactChannelData) {
  const meta = CONTACT_CHANNELS[canal];

  // Muestra entradas con valor o marcadas como próximamente.
  const entradasValidas = entradas.filter(
    (e) => e.valor.trim() !== "" || e.proximamente
  );
  if (entradasValidas.length === 0) return null;

  const Icon = meta.Icon;

  return (
    <div className="bg-card rounded-xl border border-white/10 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center shrink-0">
          <Icon size={16} className="text-accent" />
        </div>
        <h3
          className="text-2xl font-black text-white uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {meta.label}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {entradasValidas.map((entrada, i) => {
          const etiqueta = entrada.etiqueta ?? meta.etiquetaGenerica;

          if (entrada.proximamente) {
            return (
              <div
                key={`${canal}-${i}`}
                className="flex flex-col px-4 py-3 border border-white/10 rounded text-white/40 cursor-default"
              >
                <span className="text-xs uppercase tracking-wider mb-0.5">
                  {etiqueta}
                </span>
                <span className="text-sm font-semibold">Próximamente...</span>
              </div>
            );
          }

          return (
            <a
              key={`${canal}-${i}`}
              href={meta.resolveHref(entrada)}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col px-4 py-3 border border-white/10 rounded text-white/70 hover:border-accent hover:text-accent transition-all duration-200"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                {etiqueta}
              </span>
              <span className="text-sm font-semibold">{entrada.valor}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
