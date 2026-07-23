// =====================================================================
// useMedios (FEHNA) — hook que envuelve mediaService: estado de carga,
// lista, progreso y errores para el panel admin.
// =====================================================================
import { useCallback, useEffect, useState } from "react";
import {
  listarMedios,
  subirVarios,
  eliminarMedio,
  marcarPortada,
  reordenar,
  type Medio,
} from "@/lib/mediaService";
import type { Modulo } from "@/lib/mediaConfig";

interface Opciones {
  modulo: Modulo;
  entidadId?: number | null;
  /** Carga la lista existente al montar. Default: true. */
  autoCargar?: boolean;
}

export function useMedios({ modulo, entidadId = null, autoCargar = true }: Opciones) {
  const [medios, setMedios] = useState<Medio[]>([]);
  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState<{ hechos: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refrescar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setMedios(await listarMedios({ modulo, entidadId }));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setCargando(false);
    }
  }, [modulo, entidadId]);

  useEffect(() => {
    if (autoCargar) refrescar();
  }, [autoCargar, refrescar]);

  const subir = useCallback(
    async (files: File[], opts?: { esPublico?: boolean; esPortada?: boolean }) => {
      setSubiendo(true);
      setError(null);
      setProgreso({ hechos: 0, total: files.length });
      try {
        await subirVarios(
          { modulo, entidadId, esPublico: opts?.esPublico, esPortada: opts?.esPortada },
          files,
          (hechos, total) => setProgreso({ hechos, total }),
        );
        await refrescar();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setSubiendo(false);
        setProgreso(null);
      }
    },
    [modulo, entidadId, refrescar],
  );

  const eliminar = useCallback(
    async (medio: Medio) => {
      await eliminarMedio(medio);
      await refrescar();
    },
    [refrescar],
  );

  const setPortada = useCallback(
    async (medioId: number) => {
      if (entidadId == null) return;
      await marcarPortada(modulo, entidadId, medioId);
      await refrescar();
    },
    [modulo, entidadId, refrescar],
  );

  const ordenar = useCallback(
    async (ids: number[]) => {
      await reordenar(ids);
      await refrescar();
    },
    [refrescar],
  );

  return {
    medios,
    cargando,
    subiendo,
    progreso,
    error,
    subir,
    eliminar,
    setPortada,
    ordenar,
    refrescar,
  };
}
