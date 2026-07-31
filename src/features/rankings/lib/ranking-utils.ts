import type { RankingEntry, RankingSort } from "../types/ranking.types";

export type RankingFilters = { search?: string; category?: string; discipline?: string; stroke?: string; course?: string; club?: string };

export function filterRankings(entries: RankingEntry[], filters: RankingFilters): RankingEntry[] {
  const term = filters.search?.trim().toLocaleLowerCase() ?? "";
  return entries.filter((entry) => {
    const matchesTerm = !term || `${entry.athleteName} ${entry.clubName} ${entry.competitionName}`.toLocaleLowerCase().includes(term);
    return matchesTerm && (!filters.category || entry.category === filters.category) && (!filters.discipline || entry.discipline === filters.discipline) && (!filters.stroke || entry.stroke === filters.stroke) && (!filters.course || entry.course === filters.course) && (!filters.club || entry.clubId === filters.club);
  });
}

export function sortRankings(entries: RankingEntry[], sort: RankingSort = "points"): RankingEntry[] {
  return [...entries].sort((a, b) => sort === "time" ? a.timeMs - b.timeMs : sort === "position" ? a.position - b.position : sort === "date" ? b.date.localeCompare(a.date) : b.points - a.points || a.timeMs - b.timeMs);
}
