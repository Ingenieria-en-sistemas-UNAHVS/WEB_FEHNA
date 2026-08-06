import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/database.types";

export type EventoRow = Pick<
  Tables<"eventos">,
  "id" | "nombre" | "sede" | "descripcion" | "fecha_inicio" | "fecha_fin" | "publicado"
> & {
  tipos_piscina: Pick<Tables<"tipos_piscina">, "nombre"> | null;
};

export type EventoMediaRow = Pick<
  Tables<"medios">,
  "entidad_id" | "bucket" | "path" | "titulo" | "es_portada" | "orden"
>;

export class EventosDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EventosDataError";
  }
}

export async function getEventosPublicos(): Promise<EventoRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("eventos")
    .select("id, nombre, sede, descripcion, fecha_inicio, fecha_fin, publicado, tipos_piscina(nombre)")
    .eq("publicado", true)
    .order("fecha_inicio", { ascending: true });

  if (error) {
    throw new EventosDataError(`No se pudieron cargar los eventos públicos: ${error.message}`);
  }

  return (data ?? []) as EventoRow[];
}

/** Obtiene la primera imagen pública de cada evento, priorizando la portada. */
export async function getMediosEventosPublicos(
  eventIds: number[],
): Promise<EventoMediaRow[]> {
  if (eventIds.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("medios")
    .select("entidad_id, bucket, path, titulo, es_portada, orden")
    .eq("modulo", "eventos")
    .eq("tipo", "imagen")
    .eq("es_publico", true)
    .in("entidad_id", eventIds)
    .order("es_portada", { ascending: false })
    .order("orden", { ascending: true });

  if (error) {
    throw new EventosDataError(`No se pudieron cargar las imágenes de eventos: ${error.message}`);
  }

  return (data ?? []) as EventoMediaRow[];
}
