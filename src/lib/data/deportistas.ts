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

/** Fila completa para el directorio de atletas y el armado de clubes. */
export type DeportistaCompletoRow = {
  id: number;
  nombres: string;
  apellidos: string;
  sexo: "F" | "M";
  fecha_nacimiento: string;
  club_id: number | null;
  clubes: { id: number; nombre: string; abreviatura: string | null; ciudad: string | null } | null;
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

export async function getDeportistasConClub() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("deportistas")
    .select(
      "id, nombres, apellidos, sexo, fecha_nacimiento, club_id, clubes(id, nombre, abreviatura, ciudad)"
    )
    .eq("activo", true)
    .order("apellidos", { ascending: true });
  return (data ?? []) as unknown as DeportistaCompletoRow[];
}
