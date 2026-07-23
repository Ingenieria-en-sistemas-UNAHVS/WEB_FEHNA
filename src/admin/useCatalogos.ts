// =====================================================================
// useCatalogos (FEHNA) — carga los catálogos de solo lectura que sirven
// como opciones en los formularios (clubes, pruebas, categorías, etc.).
// =====================================================================
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Opcion {
  id: number;
  label: string;
}

interface Catalogos {
  clubes: Opcion[];
  pruebas: Opcion[];
  categorias: Opcion[];
  tiposPiscina: Opcion[];
  estilos: Opcion[];
  loading: boolean;
}

export function useCatalogos(): Catalogos {
  const [cat, setCat] = useState<Catalogos>({
    clubes: [],
    pruebas: [],
    categorias: [],
    tiposPiscina: [],
    estilos: [],
    loading: true,
  });

  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      const [clubes, pruebas, categorias, piscinas, estilos] = await Promise.all([
        supabase.from("clubes").select("id,nombre").order("nombre"),
        supabase
          .from("pruebas")
          .select("id,distancia,estilos(nombre)")
          .order("id"),
        supabase.from("categorias").select("id,nombre").order("id"),
        supabase.from("tipos_piscina").select("id,nombre").order("id"),
        supabase.from("estilos").select("id,nombre").order("id"),
      ]);
      if (cancelado) return;
      setCat({
        clubes: (clubes.data ?? []).map((c: any) => ({ id: c.id, label: c.nombre })),
        pruebas: (pruebas.data ?? []).map((p: any) => ({
          id: p.id,
          label: `${p.distancia}m ${p.estilos?.nombre ?? ""}`.trim(),
        })),
        categorias: (categorias.data ?? []).map((c: any) => ({ id: c.id, label: c.nombre })),
        tiposPiscina: (piscinas.data ?? []).map((c: any) => ({ id: c.id, label: c.nombre })),
        estilos: (estilos.data ?? []).map((c: any) => ({ id: c.id, label: c.nombre })),
        loading: false,
      });
    }
    cargar();
    return () => {
      cancelado = true;
    };
  }, []);

  return cat;
}
