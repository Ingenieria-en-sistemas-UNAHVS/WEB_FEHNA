import { createClient } from "@/lib/supabase/server";

export type TiempoRow = {
  id: number;
  tiempo_final: number;
  posicion: number | null;
  deportistas: {
    nombres: string;
    apellidos: string;
    clubes: { nombre: string; ciudad: string | null } | null;
  } | null;
  pruebas: {
    distancia: number;
    estilos: { nombre: string } | null;
  } | null;
  categorias: { nombre: string } | null;
  eventos: {
    nombre: string;
    sede: string | null;
    fecha_inicio: string;
  } | null;
};

export async function getTiemposRanking() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tiempos")
    .select(
      "id, tiempo_final, posicion, deportistas(nombres, apellidos, clubes(nombre, ciudad)), pruebas(distancia, estilos(nombre)), categorias(nombre), eventos(nombre, sede, fecha_inicio)"
    )
    .order("tiempo_final", { ascending: true });
  return (data ?? []) as TiempoRow[];
}
