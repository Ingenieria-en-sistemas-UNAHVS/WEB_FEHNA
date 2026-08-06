import { createClient } from "@/lib/supabase/server";

export type MedioRow = {
  id: number;
  modulo: string;
  entidad_id: number | null;
  bucket: string;
  path: string;
  tipo: "imagen" | "documento";
  titulo: string | null;
  descripcion: string | null;
  es_portada: boolean;
  orden: number;
  creado_en: string;
};

const SELECT_MEDIO =
  "id, modulo, entidad_id, bucket, path, tipo, titulo, descripcion, es_portada, orden, creado_en";

/** URL pública de Storage para un archivo de un bucket público. */
export function urlPublica(bucket: string, path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

/** Imágenes públicas de todos los módulos, para la galería del sitio. */
export async function getGaleriaPublica(limit = 60) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("medios")
    .select(SELECT_MEDIO)
    .eq("tipo", "imagen")
    .eq("es_publico", true)
    .order("creado_en", { ascending: false })
    .limit(limit);
  return (data ?? []) as MedioRow[];
}

/**
 * Portadas de un módulo indexadas por entidad, para resolver la foto de
 * un deportista o el logo de un club sin una consulta por fila.
 */
export async function getPortadasPorEntidad(
  modulo: "deportistas" | "clubes" | "noticias" | "eventos" | "patrocinadores"
): Promise<Map<number, string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("medios")
    .select("entidad_id, bucket, path")
    .eq("modulo", modulo)
    .eq("tipo", "imagen")
    .eq("es_publico", true)
    .eq("es_portada", true);

  const portadas = new Map<number, string>();
  for (const medio of data ?? []) {
    if (medio.entidad_id !== null) {
      portadas.set(medio.entidad_id, urlPublica(medio.bucket, medio.path));
    }
  }
  return portadas;
}
