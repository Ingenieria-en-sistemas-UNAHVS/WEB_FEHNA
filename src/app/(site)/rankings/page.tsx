import { RankingsDirectory } from "@/features/rankings";
import { getDirectorioSitio } from "@/lib/data";

export default async function RankingsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [params, { clubes, ranking }] = await Promise.all([searchParams, getDirectorioSitio()]);
  const page = typeof params.page === "string" ? Number(params.page) || 1 : 1;
  const sort = typeof params.sort === "string" ? params.sort as "time" | "points" | "position" | "date" : "points";
  const filterValue = (key: string) => typeof params[key] === "string" ? params[key] : "";
  return <RankingsDirectory entries={ranking} clubs={clubes} initialPage={page} initialSort={sort} initialFilters={{ search: filterValue("search"), category: filterValue("category"), discipline: filterValue("discipline"), stroke: filterValue("stroke"), course: filterValue("course"), club: filterValue("club") }} />;
}
