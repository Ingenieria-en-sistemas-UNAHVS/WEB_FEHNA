// =====================================================================
// Hooks de datos públicos (FEHNA) — lecturas reales desde Supabase para
// el sitio público. Solo traen registros publicados/activos (RLS lo
// refuerza igualmente). Devuelven formas listas para la interfaz.
// =====================================================================
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { calcularEdad, formatearTiempo } from "./tiempo";

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const IMG_DEFECTO =
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop&auto=format";

function fechaLarga(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()][0] + MESES[d.getMonth()].slice(1).toLowerCase()} ${d.getFullYear()}`;
}

// ---------- Noticias ----------
export interface NoticiaUI {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  featured: boolean;
}

export function useNoticiasPublicas() {
  const [data, setData] = useState<NoticiaUI[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ok = true;
    supabase
      .from("noticias")
      .select("id,titulo,resumen,imagen_portada,fecha_publicacion")
      .eq("publicada", true)
      .order("fecha_publicacion", { ascending: false })
      .limit(7)
      .then(({ data }) => {
        if (!ok) return;
        setData(
          (data ?? []).map((n: any, i: number) => ({
            id: n.id,
            category: "Noticia",
            title: n.titulo,
            excerpt: n.resumen ?? "",
            date: fechaLarga(n.fecha_publicacion),
            image: n.imagen_portada || IMG_DEFECTO,
            featured: i === 0,
          }))
        );
        setLoading(false);
      });
    return () => { ok = false; };
  }, []);
  return { noticias: data, loading };
}

// ---------- Eventos ----------
export interface EventoUI {
  id: number;
  date: string;
  month: string;
  title: string;
  location: string;
  discipline: string;
  type: string;
  level: string;
}

export function useEventosPublicos() {
  const [data, setData] = useState<EventoUI[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ok = true;
    supabase
      .from("eventos")
      .select("id,nombre,sede,fecha_inicio,tipos_piscina(nombre)")
      .eq("publicado", true)
      .order("fecha_inicio", { ascending: true })
      .then(({ data }) => {
        if (!ok) return;
        setData(
          (data ?? []).map((e: any) => {
            const d = new Date(e.fecha_inicio + "T00:00:00");
            return {
              id: e.id,
              date: `${d.getDate()} ${MESES[d.getMonth()][0] + MESES[d.getMonth()].slice(1).toLowerCase()}`,
              month: MESES[d.getMonth()],
              title: e.nombre,
              location: e.sede ?? "",
              discipline: "Natación",
              type: e.tipos_piscina?.nombre ?? "Oficial",
              level: "",
            };
          })
        );
        setLoading(false);
      });
    return () => { ok = false; };
  }, []);
  return { eventos: data, loading };
}

// ---------- Atletas (deportistas) ----------
export interface AtletaUI {
  id: number;
  name: string;
  club: string;
  sexo: "F" | "M";
  edad: number;
  marcas: number;
}

export function useAtletas() {
  const [data, setData] = useState<AtletaUI[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ok = true;
    supabase
      .from("deportistas")
      .select("id,nombres,apellidos,sexo,fecha_nacimiento,clubes(nombre),tiempos(count)")
      .eq("activo", true)
      .order("apellidos")
      .limit(12)
      .then(({ data }) => {
        if (!ok) return;
        setData(
          (data ?? []).map((d: any) => ({
            id: d.id,
            name: `${d.nombres} ${d.apellidos}`,
            club: d.clubes?.nombre ?? "Sin club",
            sexo: d.sexo,
            edad: calcularEdad(d.fecha_nacimiento),
            marcas: d.tiempos?.[0]?.count ?? 0,
          }))
        );
        setLoading(false);
      });
    return () => { ok = false; };
  }, []);
  return { atletas: data, loading };
}

// ---------- Tiempos (ranking) ----------
export interface TiempoUI {
  id: number;
  pos: number;
  nombre: string;
  club: string;
  departamento: string;
  categoria: string;
  prueba: string;
  tiempo: string;
  centesimas: number;
  fecha: string;
  lugar: string;
  record: boolean;
}

export function useTiemposPublicos() {
  const [data, setData] = useState<TiempoUI[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ok = true;
    supabase
      .from("tiempos")
      .select(
        "id,tiempo_final,posicion,deportistas(nombres,apellidos,clubes(nombre,ciudad)),pruebas(distancia,estilos(nombre)),categorias(nombre),eventos(nombre,sede,fecha_inicio)"
      )
      .order("tiempo_final", { ascending: true })
      .then(({ data }) => {
        if (!ok) return;
        setData(
          (data ?? []).map((t: any, i: number) => ({
            id: t.id,
            pos: t.posicion ?? i + 1,
            nombre: t.deportistas ? `${t.deportistas.nombres} ${t.deportistas.apellidos}` : "—",
            club: t.deportistas?.clubes?.nombre ?? "—",
            departamento: t.deportistas?.clubes?.ciudad ?? "",
            categoria: t.categorias?.nombre ?? "",
            prueba: t.pruebas ? `${t.pruebas.distancia}m ${t.pruebas.estilos?.nombre ?? ""}`.trim() : "",
            tiempo: formatearTiempo(t.tiempo_final),
            centesimas: t.tiempo_final,
            fecha: t.eventos ? fechaLarga(t.eventos.fecha_inicio) : "",
            lugar: t.eventos?.sede ?? t.eventos?.nombre ?? "",
            record: false,
          }))
        );
        setLoading(false);
      });
    return () => { ok = false; };
  }, []);
  return { tiempos: data, loading };
}
