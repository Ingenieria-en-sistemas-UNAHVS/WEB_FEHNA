import type { Athlete } from "@/features/athletes";
import type { Club, ClubSort } from "../types/club.types";

export function getClubById(items: Club[], id: string): Club | undefined {
  return items.find((club) => club.id === id);
}

export function getClubStats(club: Club) {
  const goldMedals = club.medals.filter((medal) => medal.type === "Oro").length;
  const silverMedals = club.medals.filter((medal) => medal.type === "Plata").length;
  const bronzeMedals = club.medals.filter((medal) => medal.type === "Bronce").length;
  const places = club.performances.filter((performance) => performance.status === "valid").map((performance) => performance.place);
  return {
    totalPoints: club.totalPoints,
    goldMedals,
    silverMedals,
    bronzeMedals,
    totalMedals: goldMedals + silverMedals + bronzeMedals,
    activeAthletes: club.athleteIds.length,
    competitionsCount: club.competitions.length,
    bestPlace: places.length ? Math.min(...places) : null,
  };
}

export function getClubAthletes(club: Club, items: Athlete[]): Athlete[] {
  return items.filter((athlete) => club.athleteIds.includes(athlete.id));
}

export function rankClubs(items: Club[], sort: ClubSort = "points"): Club[] {
  return [...items].sort((a, b) => {
    const aStats = getClubStats(a);
    const bStats = getClubStats(b);
    if (sort === "medals") return bStats.totalMedals - aStats.totalMedals || bStats.goldMedals - aStats.goldMedals;
    if (sort === "athletes") return bStats.activeAthletes - aStats.activeAthletes || b.totalPoints - a.totalPoints;
    if (sort === "competitions") return bStats.competitionsCount - aStats.competitionsCount || b.totalPoints - a.totalPoints;
    if (sort === "name") return a.name.localeCompare(b.name);
    return b.totalPoints - a.totalPoints || a.name.localeCompare(b.name);
  });
}
