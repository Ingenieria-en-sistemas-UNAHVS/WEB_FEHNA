import { createClient } from "@/lib/supabase/server";

export type DeportistaRow = {
  id: number;
  nombres: string;
  apellidos: string;
  sexo: "F" | "M";
  fecha_nacimiento: string;
  activo: boolean;
  clubes: { nombre: string } | null;
  tiempos: [{ count: number }] | null;
};

export async function getDeportistasPublicos(limit = 12) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("deportistas")
    .select("id, nombres, apellidos, sexo, fecha_nacimiento, clubes(nombre), tiempos(count)")
    .eq("activo", true)
    .order("apellidos")
    .limit(limit);
  return (data ?? []) as DeportistaRow[];
}
