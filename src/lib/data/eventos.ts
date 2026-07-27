import { createClient } from "@/lib/supabase/server";

export type EventoRow = {
  id: number;
  nombre: string;
  sede: string | null;
  descripcion: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  publicado: boolean;
  tipos_piscina: { nombre: string } | null;
};

export async function getEventosPublicos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("eventos")
    .select("id, nombre, sede, fecha_inicio, fecha_fin, publicado, tipos_piscina(nombre)")
    .eq("publicado", true)
    .order("fecha_inicio", { ascending: true });
  return (data ?? []) as EventoRow[];
}
