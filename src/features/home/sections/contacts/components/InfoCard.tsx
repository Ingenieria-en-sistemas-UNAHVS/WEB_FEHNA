import { iconoContacto } from "@/lib/contactoIconos";
import type { InfoContactoRow } from "@/lib/data/contacto";

interface InfoCardProps {
  info: InfoContactoRow;
}

// Tarjeta de un ítem de información de contacto (tabla `informacion_contacto`).
export function InfoCard({ info }: InfoCardProps) {
  const Icon = iconoContacto(info.icono);

  return (
    <div className="flex flex-col gap-3 bg-card rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center shrink-0">
          <Icon size={16} className="text-accent" />
        </div>
        <h3
          className="text-lg font-black text-white uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {info.titulo}
        </h3>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{info.descripcion}</p>
    </div>
  );
}
