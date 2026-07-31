import type { Athlete, AthletePerformance, RankedAthlete } from "../types/athlete.types";

export function getBestPerformance(athlete: Athlete): AthletePerformance {
  return athlete.performances.filter((performance) => performance.status === "valid").reduce((best, performance) => performance.timeMs < best.timeMs ? performance : best);
}

export function getTotalPoints(athlete: Athlete): number {
  return athlete.performances.reduce((total, performance) => total + performance.points, 0);
}

export function rankAthletes(athletes: Athlete[]): RankedAthlete[] {
  return [...athletes]
    .map((athlete) => ({ ...athlete, totalPoints: getTotalPoints(athlete), bestPerformance: getBestPerformance(athlete), rankingPosition: 0 }))
    .sort((a, b) => b.totalPoints - a.totalPoints || a.bestPerformance.timeMs - b.bestPerformance.timeMs)
    .map((athlete, index) => ({ ...athlete, rankingPosition: index + 1 }));
}

export function getAthleteById<T extends Athlete>(athletes: T[], id: string): T | undefined {
  return athletes.find((athlete) => athlete.id === id);
}
