import type {
  Athlete,
  AthleteCompetition,
  AthleteMedal,
  AthletePerformance,
  AthleteTeam,
  MedalType,
} from "@/features/athletes";
import type { DeportistaCompletoRow } from "@/lib/data/deportistas";
import type { TiempoRow } from "@/lib/data/tiempos";
import {
  abreviaturaClub,
  centesimasAMs,
  clubUiId,
  codigoAPiscina,
  nombrePrueba,
  SIN_CLUB_ID,
} from "./shared";

/**
 * La base solo registra natación de piscina; el modelo de la UI contempla
 * otras disciplinas para el futuro, así que todo resultado entra como
 * "Natación" hasta que existan tablas para las demás.
 */
const DISCIPLINA = "Natación" as const;

const EQUIPO_SIN_CLUB: AthleteTeam = {
  id: SIN_CLUB_ID,
  name: "Sin club",
  shortName: "S/C",
  city: "—",
};

const MEDALLA_POR_PUESTO: Record<number, MedalType> = {
  1: "Oro",
  2: "Plata",
  3: "Bronce",
};

function aEquipo(club: DeportistaCompletoRow["clubes"]): AthleteTeam {
  if (!club) return EQUIPO_SIN_CLUB;
  return {
    id: clubUiId(club.id),
    name: club.nombre,
    shortName: abreviaturaClub(club.nombre, club.abreviatura),
    city: club.ciudad ?? "—",
  };
}

function aResultado(tiempo: TiempoRow): AthletePerformance {
  const estilo = tiempo.pruebas?.estilos?.nombre ?? "Libre";
  return {
    id: `p-${tiempo.id}`,
    swimType: DISCIPLINA,
    stroke: estilo,
    distanceMeters: tiempo.pruebas?.distancia ?? 0,
    course: codigoAPiscina(tiempo.eventos?.tipos_piscina?.codigo),
    timeMs: centesimasAMs(tiempo.tiempo_final),
    points: tiempo.puntos ?? 0,
    place: tiempo.posicion ?? 0,
    competitionId: `comp-${tiempo.eventos?.id ?? 0}`,
    competitionName: tiempo.eventos?.nombre ?? "Competencia sin nombre",
    date: tiempo.eventos?.fecha_inicio ?? "",
    status: "valid",
  };
}

/** Agrupa los resultados de un atleta por competencia. */
export function aCompetencias(
  resultados: AthletePerformance[],
  sedePorCompetencia: Map<string, string>
): AthleteCompetition[] {
  const porCompetencia = new Map<string, AthleteCompetition>();

  for (const resultado of resultados) {
    const previa = porCompetencia.get(resultado.competitionId);
    const puestosValidos = resultado.place > 0;

    if (!previa) {
      porCompetencia.set(resultado.competitionId, {
        id: resultado.competitionId,
        name: resultado.competitionName,
        date: resultado.date,
        location: sedePorCompetencia.get(resultado.competitionId) ?? "",
        events: 1,
        bestPlace: puestosValidos ? resultado.place : 0,
        points: resultado.points,
      });
      continue;
    }

    previa.events += 1;
    previa.points += resultado.points;
    if (puestosValidos && (previa.bestPlace === 0 || resultado.place < previa.bestPlace)) {
      previa.bestPlace = resultado.place;
    }
  }

  return [...porCompetencia.values()].sort((a, b) => b.date.localeCompare(a.date));
}

/** Deriva las medallas a partir de los podios (posición 1, 2 o 3). */
export function aMedallas(resultados: AthletePerformance[]): AthleteMedal[] {
  return resultados
    .filter((resultado) => resultado.place >= 1 && resultado.place <= 3)
    .map((resultado) => ({
      id: `m-${resultado.id}`,
      type: MEDALLA_POR_PUESTO[resultado.place],
      competitionName: resultado.competitionName,
      eventName: nombrePrueba(resultado.distanceMeters, resultado.stroke),
      date: resultado.date,
    }));
}

/**
 * Construye los atletas del sitio público a partir de las filas de
 * `deportistas` y `tiempos`. Un deportista sin marcas registradas entra
 * igual, con listas vacías.
 */
export function aAtletas(
  deportistas: DeportistaCompletoRow[],
  tiempos: TiempoRow[],
  fotos: Map<number, string> = new Map()
): Athlete[] {
  const resultadosPorDeportista = new Map<number, AthletePerformance[]>();
  const sedePorCompetencia = new Map<string, string>();

  for (const tiempo of tiempos) {
    const deportistaId = tiempo.deportistas?.id;
    if (deportistaId === undefined) continue;

    const resultado = aResultado(tiempo);
    const acumulados = resultadosPorDeportista.get(deportistaId);
    if (acumulados) acumulados.push(resultado);
    else resultadosPorDeportista.set(deportistaId, [resultado]);

    if (tiempo.eventos?.sede) {
      sedePorCompetencia.set(resultado.competitionId, tiempo.eventos.sede);
    }
  }

  return deportistas.map((deportista) => {
    const resultados = resultadosPorDeportista.get(deportista.id) ?? [];
    return {
      id: String(deportista.id),
      federationCode: `HN-${String(deportista.id).padStart(5, "0")}`,
      firstName: deportista.nombres,
      lastName: deportista.apellidos,
      gender: deportista.sexo,
      birthDate: deportista.fecha_nacimiento,
      nationality: "Honduras",
      team: aEquipo(deportista.clubes),
      photoUrl: fotos.get(deportista.id),
      performances: resultados,
      competitions: aCompetencias(resultados, sedePorCompetencia),
      medals: aMedallas(resultados),
    };
  });
}
