import { createClient } from "@/lib/supabase/server";

export type PatrocinadorRow = {
  id: number;
  nombre: string;
  logo_url: string;
  orden: number;
  visible: boolean;
};

export async function getPatrocinadoresPublicos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("patrocinadores")
    .select("id, nombre, logo_url, orden")
    .eq("visible", true)
    .order("orden", { ascending: true });
  return (data ?? []) as PatrocinadorRow[];
}
