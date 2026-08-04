import {
  getEventosPublicos,
  getMediosEventosPublicos,
  type EventoMediaRow,
} from "@/lib/data/eventos";
import { createClient } from "@/lib/supabase/server";
import { toCalendarEvent } from "./event-adapter";
import type { CalendarEvent } from "../types/event.types";

/** Carga el calendario público y lo entrega listo para los componentes de UI. */
export async function getPublicCalendarEvents(): Promise<CalendarEvent[]> {
  const events = await getEventosPublicos();
  const media = await getMediosEventosPublicos(events.map((event) => event.id));
  const mediaByEvent = new Map<number, EventoMediaRow>();

  for (const item of media) {
    if (item.entidad_id !== null && !mediaByEvent.has(item.entidad_id)) {
      mediaByEvent.set(item.entidad_id, item);
    }
  }

  const supabase = await createClient();

  return events.map((event) => {
    const eventMedia = mediaByEvent.get(event.id);
    const publicUrl = eventMedia
      ? supabase.storage.from(eventMedia.bucket).getPublicUrl(eventMedia.path).data.publicUrl
      : undefined;

    return toCalendarEvent(event, eventMedia, publicUrl);
  });
}
