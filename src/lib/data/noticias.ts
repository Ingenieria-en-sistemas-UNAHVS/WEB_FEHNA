import { createClient } from "@/lib/supabase/server";

export type NoticiaRow = {
  id: number;
  titulo: string;
  slug: string | null;
  resumen: string | null;
  contenido: string | null;
  imagen_portada: string | null;
  fecha_publicacion: string | null;
  publicada: boolean;
};

export async function getNoticiasPublicas(limit = 7) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("noticias")
    .select("id, titulo, slug, resumen, contenido, imagen_portada, fecha_publicacion")
    .eq("publicada", true)
    .order("fecha_publicacion", { ascending: false })
    .limit(limit);
  return (data ?? []) as NoticiaRow[];
}

export async function getNoticiaBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("noticias")
    .select("id, titulo, slug, resumen, contenido, imagen_portada, fecha_publicacion")
    .eq("slug", slug)
    .eq("publicada", true)
    .single();
  return (data as NoticiaRow) ?? null;
}
