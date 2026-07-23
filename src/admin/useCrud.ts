// =====================================================================
// useCrud (FEHNA) — hook genérico de lectura/escritura sobre una tabla
// ---------------------------------------------------------------------
// Maneja listar + crear + actualizar + eliminar contra Supabase.
// La autorización real la aplican las políticas RLS de la base; si una
// escritura no está permitida, Supabase devuelve un error que se expone
// en `error` para mostrarlo en la interfaz.
// =====================================================================
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Opciones {
  select?: string;
  orderBy?: { column: string; ascending?: boolean };
}

export function useCrud<Row extends { id: number }>(
  tabla: string,
  opciones: Opciones = {}
) {
  const { select = "*", orderBy } = opciones;
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    let q = supabase.from(tabla).select(select);
    if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    const { data, error } = await q;
    if (error) setError(error.message);
    else setRows((data as unknown as Row[]) ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabla, select]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function crear(valores: Record<string, unknown>) {
    const { error } = await supabase.from(tabla).insert(valores as never);
    if (error) return { error: error.message };
    await cargar();
    return { error: null };
  }

  async function actualizar(id: number, valores: Record<string, unknown>) {
    const { error } = await supabase.from(tabla).update(valores as never).eq("id", id);
    if (error) return { error: error.message };
    await cargar();
    return { error: null };
  }

  async function eliminar(id: number) {
    const { error } = await supabase.from(tabla).delete().eq("id", id);
    if (error) return { error: error.message };
    await cargar();
    return { error: null };
  }

  return { rows, loading, error, recargar: cargar, crear, actualizar, eliminar };
}
