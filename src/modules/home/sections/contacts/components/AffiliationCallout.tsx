import { ArrowRight } from "lucide-react";

// Mensaje para quienes buscan afiliarse a un grupo. Enlace temporal ("#");
// a futuro apuntará a la página de grupos.
export function AffiliationCallout() {
  return (
    <div className="bg-card rounded-xl border border-white/10 p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
      <div>
        <h3
          className="text-2xl font-black text-white uppercase mb-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          ¿Buscas afiliarte a un grupo?
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
          Consulta los grupos y clubes afiliados a la federación junto con sus
          datos y canales de contacto para unirte al que mejor se adapte a ti.
        </p>
      </div>

      <a
        href="#"
        className="self-start sm:self-auto shrink-0 flex items-center gap-2 px-5 py-3 bg-accent text-[#061529] font-bold rounded text-sm hover:bg-white transition-all duration-200"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
      >
        VER GRUPOS <ArrowRight size={14} />
      </a>
    </div>
  );
}
