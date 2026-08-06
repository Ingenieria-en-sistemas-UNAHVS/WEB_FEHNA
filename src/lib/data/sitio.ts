import { rankAthletes } from "@/features/athletes";
import type { RankedAthlete } from "@/features/athletes";
import type { Club } from "@/features/clubs";
import { aAtletas, aClubes, aEntradasRanking } from "@/lib/mappers";
import type { RankingEntry } from "@/features/rankings";
import { getClubesPublicos } from "./clubes";
import { getDeportistasConClub } from "./deportistas";
import { getPortadasPorEntidad } from "./medios";
import { getTiemposRanking } from "./tiempos";
import type { TiempoRow } from "./tiempos";

export type DirectorioSitio = {
  atletas: RankedAthlete[];
  clubes: Club[];
  ranking: RankingEntry[];
  /** Filas crudas de `tiempos`, para las secciones que las consumen directo. */
  tiempos: TiempoRow[];
};

/**
 * Carga en una sola pasada todo lo que comparten atletas, clubes y
 * rankings. Las páginas la llaman en lugar de repetir las consultas: los
 * puntos de un club se derivan de los mismos resultados que ve el atleta.
 */
export async function getDirectorioSitio(): Promise<DirectorioSitio> {
  const [deportistas, tiempos, clubes, fotos, logos] = await Promise.all([
    getDeportistasConClub(),
    getTiemposRanking(),
    getClubesPublicos(),
    getPortadasPorEntidad("deportistas"),
    getPortadasPorEntidad("clubes"),
  ]);

  const atletas = rankAthletes(aAtletas(deportistas, tiempos, fotos));

  return {
    atletas,
    clubes: aClubes(clubes, atletas, logos),
    ranking: aEntradasRanking(tiempos),
    tiempos,
  };
}
