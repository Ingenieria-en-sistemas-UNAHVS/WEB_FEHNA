import { athletes } from "@/features/athletes";
import type { RankingEntry } from "../types/ranking.types";

const baseEntries: RankingEntry[] = athletes.flatMap((athlete) => athlete.performances.map((performance, index) => ({
  id: `ranking-${performance.id}`,
  position: performance.place,
  athleteId: athlete.id,
  athleteName: `${athlete.firstName} ${athlete.lastName}`,
  clubId: athlete.team.id,
  clubName: athlete.team.name,
  gender: athlete.gender,
  category: athlete.birthDate < "2007-01-01" ? "Absoluta" : athlete.birthDate < "2010-01-01" ? "Junior" : "Juvenil",
  discipline: performance.swimType,
  stroke: performance.stroke,
  distanceMeters: performance.distanceMeters,
  course: performance.course,
  timeMs: performance.timeMs,
  points: performance.points,
  competitionId: performance.competitionId,
  competitionName: performance.competitionName,
  date: performance.date,
  location: "Honduras",
  status: performance.status === "valid" ? "valid" : "disqualified",
})));

const extraEntries: RankingEntry[] = Array.from({ length: 20 }, (_, index) => {
  const athlete = athletes[index % athletes.length];
  const performance = athlete.performances[0];
  return {
    id: `ranking-extra-${index + 1}`,
    position: (index % 8) + 1,
    athleteId: athlete.id,
    athleteName: `${athlete.firstName} ${athlete.lastName}`,
    clubId: athlete.team.id,
    clubName: athlete.team.name,
    gender: athlete.gender,
    category: index % 3 === 0 ? "Absoluta" : index % 3 === 1 ? "Junior" : "Juvenil",
    discipline: "Natación",
    stroke: ["Libre", "Dorso", "Pecho", "Mariposa"][index % 4],
    distanceMeters: [50, 100, 200, 400][index % 4],
    course: index % 4 === 0 ? "SC" : "LC",
    timeMs: performance.timeMs + (index + 1) * 870,
    points: Math.max(420, performance.points - (index + 1) * 7),
    competitionId: `comp-extra-${index % 4}`,
    competitionName: ["Gran Premio Tegucigalpa", "Copa del Litoral", "Festival Nacional", "Open de Primavera"][index % 4],
    date: `2025-${String((index % 9) + 1).padStart(2, "0")}-15`,
    location: ["Tegucigalpa", "San Pedro Sula", "La Ceiba", "Comayagua"][index % 4],
    status: "valid",
  };
});

export const rankingEntries: RankingEntry[] = [...baseEntries, ...extraEntries].sort((a, b) => b.points - a.points || a.timeMs - b.timeMs);
