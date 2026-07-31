import type { RankedAthlete } from "../types/athlete.types";
import { AthleteCard } from "./AthleteCard";

export function AthleteList({ athletes }: { athletes: RankedAthlete[] }) {
  if (athletes.length === 0) return <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center text-sm text-muted-foreground">No encontramos atletas con esos filtros. Intenta con otra búsqueda.</div>;
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{athletes.map((athlete) => <AthleteCard key={athlete.id} athlete={athlete} />)}</div>;
}
