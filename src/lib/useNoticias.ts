// =====================================================================
// Ejemplo de hook de acceso a datos.
// Copia este patrón para leer cualquier otra tabla (eventos, clubes,
// deportistas, tiempos, etc.). El cliente ya está tipado, así que
// `noticias` autocompleta las columnas de la tabla.
// =====================================================================
import { useEffect, useState } from "react";
import { supabase, type Tables } from "./supabase";

export type Noticia = Tables<"noticias">;

export function useNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      setLoading(true);
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("publicada", true)
        .order("fecha_publicacion", { ascending: false });

      if (cancelado) return;
      if (error) setError(error.message);
      else setNoticias(data ?? []);
      setLoading(false);
    }

    cargar();
    return () => {
      cancelado = true;
    };
  }, []);

  return { noticias, loading, error };
}
