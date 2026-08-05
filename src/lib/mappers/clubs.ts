import type { Athlete } from "@/features/athletes";
import type { Club } from "@/features/clubs";
import type { ClubRow } from "@/lib/data/clubes";
import { abreviaturaClub, clubUiId } from "./shared";

/**
 * Construye los clubes del sitio público. Las estadísticas (puntos,
 * medallas, competencias) se agregan desde los atletas ya mapeados, para
 * que club y atleta nunca muestren cifras distintas.
 */
export function aClubes(
  clubes: ClubRow[],
  atletas: Athlete[],
  logos: Map<number, string> = new Map()
): Club[] {
  return clubes.map((club) => {
    const id = clubUiId(club.id);
    const miembros = atletas.filter((atleta) => atleta.team.id === id);
    const resultados = miembros.flatMap((atleta) => atleta.performances);
    const competencias = miembros.flatMap((atleta) => atleta.competitions);
    const medallas = miembros.flatMap((atleta) => atleta.medals);

    return {
      id,
      name: club.nombre,
      shortName: abreviaturaClub(club.nombre, club.abreviatura),
      federationCode: `FEHNA-${abreviaturaClub(club.nombre, club.abreviatura)}`,
      city: club.ciudad ?? "—",
      // La base no distingue ciudad de departamento todavía.
      department: club.ciudad ?? "—",
      country: "Honduras",
      logoUrl: logos.get(club.id),
      isActive: club.activo,
      foundedYear: new Date(club.creado_en).getFullYear(),
      athleteIds: miembros.map((atleta) => atleta.id),
      competitions: [...new Map(competencias.map((c) => [c.id, c])).values()],
      performances: resultados,
      medals: medallas,
      totalPoints: resultados.reduce((total, resultado) => total + resultado.points, 0),
    };
  });
}
