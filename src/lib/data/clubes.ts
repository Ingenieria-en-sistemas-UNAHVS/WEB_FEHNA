import { createClient } from "@/lib/supabase/server";

export type ClubRow = {
  id: number;
  nombre: string;
  abreviatura: string | null;
  ciudad: string | null;
  activo: boolean;
  creado_en: string;
};

export async function getClubesPublicos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("clubes")
    .select("id, nombre, abreviatura, ciudad, activo, creado_en")
    .order("nombre", { ascending: true });
  return (data ?? []) as ClubRow[];
}
