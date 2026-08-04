import type { EventoMediaRow, EventoRow } from "@/lib/data/eventos";
import type { CalendarEvent } from "../types/event.types";

/**
 * Convierte el contrato persistido en el contrato visual de eventos.
 *
 * El esquema actual todavía no contiene código, tipo, disciplinas,
 * patrocinadores ni categorías relacionadas. Esos campos se dejan vacíos
 * hasta que exista la relación correspondiente en Supabase, evitando
 * presentar información inventada en la web pública.
 */
export function toCalendarEvent(
  row: EventoRow,
  media?: EventoMediaRow,
  publicUrl?: string,
): CalendarEvent {
  return {
    id: String(row.id),
    name: row.nombre,
    description: row.descripcion ?? undefined,
    startDate: row.fecha_inicio,
    endDate: row.fecha_fin ?? undefined,
    location: row.sede ?? undefined,
    sponsors: [],
    disciplines: [],
    participantCategories: [],
    image: media && publicUrl
      ? {
          src: publicUrl,
          alt: media.titulo || `Imagen del evento ${row.nombre}`,
        }
      : undefined,
  };
}
