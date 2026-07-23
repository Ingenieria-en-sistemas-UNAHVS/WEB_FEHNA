// =====================================================================
// Íconos de la sección Contáctanos (FEHNA)
// ---------------------------------------------------------------------
// Mapea los valores fijos guardados en la base de datos (enum
// tipo_red_social y la clave de texto `informacion_contacto.icono`) a
// componentes de ícono de lucide-react. Se usa tanto en el sitio
// público (src/app/App.tsx) como en el panel admin
// (src/admin/modules/ContactoAdmin.tsx) para no duplicar el mapeo.
// =====================================================================
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  X as XIcon,
  Music2,
  MessageCircle,
  AtSign,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Building2,
  Smartphone,
  Printer,
  type LucideIcon,
} from "lucide-react";
import type { Enums } from "./supabase";

// ---------- Redes sociales (catálogo fijo, enum tipo_red_social) ----------
export const REDES_SOCIALES_INFO: Record<
  Enums<"tipo_red_social">,
  { label: string; Icon: LucideIcon }
> = {
  facebook: { label: "Facebook", Icon: Facebook },
  instagram: { label: "Instagram", Icon: Instagram },
  x: { label: "X (Twitter)", Icon: XIcon },
  youtube: { label: "YouTube", Icon: Youtube },
  tiktok: { label: "TikTok", Icon: Music2 },
  whatsapp: { label: "WhatsApp", Icon: MessageCircle },
  linkedin: { label: "LinkedIn", Icon: Linkedin },
  threads: { label: "Threads", Icon: AtSign },
};

export const ORDEN_REDES_SOCIALES = Object.keys(
  REDES_SOCIALES_INFO
) as Enums<"tipo_red_social">[];

// ---------- Información de contacto (icono = texto libre elegido de esta lista) ----------
export const ICONOS_CONTACTO_INFO: Record<string, { label: string; Icon: LucideIcon }> = {
  phone: { label: "Teléfono", Icon: Phone },
  mail: { label: "Correo", Icon: Mail },
  "map-pin": { label: "Ubicación / Dirección", Icon: MapPin },
  globe: { label: "Sitio web", Icon: Globe },
  clock: { label: "Horario de atención", Icon: Clock },
  "building-2": { label: "Oficina / Sede", Icon: Building2 },
  smartphone: { label: "Celular", Icon: Smartphone },
  printer: { label: "Fax", Icon: Printer },
  "message-circle": { label: "WhatsApp / Chat", Icon: MessageCircle },
};

// Compatibilidad: mapa simple clave -> componente de ícono.
export const ICONOS_CONTACTO: Record<string, LucideIcon> = Object.fromEntries(
  Object.entries(ICONOS_CONTACTO_INFO).map(([clave, v]) => [clave, v.Icon])
);

export const ICONO_CONTACTO_DEFECTO = "phone";

export function iconoContacto(clave: string): LucideIcon {
  return ICONOS_CONTACTO[clave] ?? ICONOS_CONTACTO[ICONO_CONTACTO_DEFECTO];
}
