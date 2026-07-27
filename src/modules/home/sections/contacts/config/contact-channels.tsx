import {
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  X as XIcon,
  type LucideIcon,
} from "lucide-react";
import type { ContactChannel, ContactEntry } from "../types/contact.types";

// Metadatos de presentación por canal: etiqueta, ícono, texto genérico
// y cómo construir el enlace cuando la entrada no trae `href`.
interface ContactChannelMeta {
  label: string;
  Icon: LucideIcon;
  etiquetaGenerica: string;
  resolveHref: (entry: ContactEntry) => string;
}

const soloDigitos = (valor: string) => valor.replace(/\D/g, "");

export const CONTACT_CHANNELS: Record<ContactChannel, ContactChannelMeta> = {
  whatsapp: {
    label: "WhatsApp",
    Icon: MessageCircle,
    etiquetaGenerica: "Escríbenos",
    resolveHref: (e) => e.href ?? `https://wa.me/${soloDigitos(e.valor)}`,
  },
  correo: {
    label: "Correo",
    Icon: Mail,
    etiquetaGenerica: "Envíanos un correo",
    resolveHref: (e) => e.href ?? `mailto:${e.valor}`,
  },
  instagram: {
    label: "Instagram",
    Icon: Instagram,
    etiquetaGenerica: "Síguenos",
    resolveHref: (e) => e.href ?? e.valor,
  },
  facebook: {
    label: "Facebook",
    Icon: Facebook,
    etiquetaGenerica: "Síguenos",
    resolveHref: (e) => e.href ?? e.valor,
  },
  youtube: {
    label: "YouTube",
    Icon: Youtube,
    etiquetaGenerica: "Suscríbete",
    resolveHref: (e) => e.href ?? e.valor,
  },
  x: {
    label: "X",
    Icon: XIcon,
    etiquetaGenerica: "Síguenos",
    resolveHref: (e) => e.href ?? e.valor,
  },
};

// Orden de aparición de los canales en la sección.
export const CONTACT_CHANNEL_ORDER: ContactChannel[] = [
  "whatsapp",
  "correo",
  "instagram",
  "facebook",
  "youtube",
  "x",
];
