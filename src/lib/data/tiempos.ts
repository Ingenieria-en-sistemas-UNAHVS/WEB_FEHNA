import { createClient } from "@/lib/supabase/server";

export type TiempoRow = {
  id: number;
  tiempo_final: number;
  puntos: number | null;
  posicion: number | null;
  deportistas: {
    id: number;
    nombres: string;
    apellidos: string;
    sexo: "F" | "M";
    club_id: number | null;
    clubes: { id: number; nombre: string; abreviatura: string | null; ciudad: string | null } | null;
  } | null;
  pruebas: {
    id: number;
    distancia: number;
    estilos: { nombre: string } | null;
  } | null;
  categorias: { nombre: string } | null;
  eventos: {
    id: number;
    nombre: string;
    sede: string | null;
    fecha_inicio: string;
    tipos_piscina: { codigo: string } | null;
  } | null;
};

const SELECT_TIEMPO =
  "id, tiempo_final, puntos, posicion, " +
  "deportistas(id, nombres, apellidos, sexo, club_id, clubes(id, nombre, abreviatura, ciudad)), " +
  "pruebas(id, distancia, estilos(nombre)), " +
  "categorias(nombre), " +
  "eventos(id, nombre, sede, fecha_inicio, tipos_piscina(codigo))";

export async function getTiemposRanking() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tiempos")
    .select(SELECT_TIEMPO)
    .order("tiempo_final", { ascending: true });
  return (data ?? []) as unknown as TiempoRow[];
}
