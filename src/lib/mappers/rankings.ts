import type { RankingEntry } from "@/features/rankings";
import type { TiempoRow } from "@/lib/data/tiempos";
import { centesimasAMs, clubUiId, codigoAPiscina, SIN_CLUB_ID } from "./shared";

/** Ver nota en `mappers/athletes.ts`: la base solo registra natación. */
const DISCIPLINA = "Natación";

/**
 * Convierte las filas de `tiempos` en entradas del ranking público.
 * `getTiemposRanking()` ya viene ordenado por tiempo, así que la posición
 * de la lista sirve de respaldo cuando el resultado no trae `posicion`.
 */
export function aEntradasRanking(tiempos: TiempoRow[]): RankingEntry[] {
  return tiempos.map((tiempo, indice) => {
    const deportista = tiempo.deportistas;
    const club = deportista?.clubes;

    return {
      id: String(tiempo.id),
      position: tiempo.posicion ?? indice + 1,
      athleteId: deportista ? String(deportista.id) : "",
      athleteName: deportista ? `${deportista.nombres} ${deportista.apellidos}` : "—",
      clubId: club ? clubUiId(club.id) : SIN_CLUB_ID,
      clubName: club?.nombre ?? "Sin club",
      gender: deportista?.sexo ?? "F",
      category: tiempo.categorias?.nombre ?? "",
      discipline: DISCIPLINA,
      stroke: tiempo.pruebas?.estilos?.nombre ?? "",
      distanceMeters: tiempo.pruebas?.distancia ?? 0,
      course: codigoAPiscina(tiempo.eventos?.tipos_piscina?.codigo),
      timeMs: centesimasAMs(tiempo.tiempo_final),
      points: tiempo.puntos ?? 0,
      competitionId: `comp-${tiempo.eventos?.id ?? 0}`,
      competitionName: tiempo.eventos?.nombre ?? "",
      date: tiempo.eventos?.fecha_inicio ?? "",
      location: tiempo.eventos?.sede ?? "",
      status: "valid",
    };
  });
}
