import type { LucideIcon } from "lucide-react";
import { REDES_SOCIALES_INFO } from "@/lib/contactoIconos";
import type { RedSocialRow } from "@/lib/data/contacto";
import type { Enums } from "@/lib/database.types";

interface SocialCardProps {
  red: RedSocialRow;
}

// Tarjeta de un único canal social (tabla `redes_sociales`).
export function SocialCard({ red }: SocialCardProps) {
  const meta = REDES_SOCIALES_INFO[red.red as Enums<"tipo_red_social">];
  if (!meta) return null;

  const Icon: LucideIcon = meta.Icon;

  return (
    <a
      href={red.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 bg-card rounded-xl border border-white/10 p-6 hover:border-accent hover:text-accent transition-all duration-200 text-white/70"
    >
      <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center shrink-0">
        <Icon size={16} className="text-accent" />
      </div>
      <span className="text-sm font-semibold">{meta.label}</span>
    </a>
  );
}
