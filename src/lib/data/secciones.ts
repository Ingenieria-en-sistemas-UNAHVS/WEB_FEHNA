import { createClient } from "@/lib/supabase/server";

/**
 * Visibilidad de secciones del sitio público, gestionada desde el admin
 * (tabla `configuracion_secciones`). Una sección sin fila se considera
 * visible.
 */
export async function getSeccionesVisibles(): Promise<Record<string, boolean>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("configuracion_secciones")
    .select("seccion, visible");

  const visibles: Record<string, boolean> = {};
  for (const fila of data ?? []) visibles[fila.seccion] = fila.visible;
  return visibles;
}

export function esVisible(secciones: Record<string, boolean>, seccion: string): boolean {
  return secciones[seccion] ?? true;
}
