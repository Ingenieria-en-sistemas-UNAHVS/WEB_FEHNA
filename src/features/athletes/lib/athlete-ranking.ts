import type { Athlete, AthletePerformance, RankedAthlete } from "../types/athlete.types";

/** null cuando el atleta aún no tiene marcas válidas registradas. */
export function getBestPerformance(athlete: Athlete): AthletePerformance | null {
  const valid = athlete.performances.filter((performance) => performance.status === "valid");
  if (valid.length === 0) return null;
  return valid.reduce((best, performance) => performance.timeMs < best.timeMs ? performance : best);
}

export function getTotalPoints(athlete: Athlete): number {
  return athlete.performances.reduce((total, performance) => total + performance.points, 0);
}

export function rankAthletes(athletes: Athlete[]): RankedAthlete[] {
  return [...athletes]
    .map((athlete) => ({ ...athlete, totalPoints: getTotalPoints(athlete), bestPerformance: getBestPerformance(athlete), rankingPosition: 0 }))
    .sort((a, b) => b.totalPoints - a.totalPoints || (a.bestPerformance?.timeMs ?? Infinity) - (b.bestPerformance?.timeMs ?? Infinity))
    .map((athlete, index) => ({ ...athlete, rankingPosition: index + 1 }));
}

export function getAthleteById<T extends Athlete>(athletes: T[], id: string): T | undefined {
  return athletes.find((athlete) => athlete.id === id);
}
