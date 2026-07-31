import { clubs } from "@/features/clubs";
import { rankingEntries, RankingsDirectory } from "@/features/rankings";

export default async function RankingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? Number(params.page) || 1 : 1;
  const sort = typeof params.sort === "string" ? params.sort as "time" | "points" | "position" | "date" : "points";
  const filterValue = (key: string) => typeof params[key] === "string" ? params[key] : "";
  return <RankingsDirectory entries={rankingEntries} clubs={clubs} initialPage={page} initialSort={sort} initialFilters={{ search: filterValue("search"), category: filterValue("category"), discipline: filterValue("discipline"), stroke: filterValue("stroke"), course: filterValue("course"), club: filterValue("club") }} />;
}
