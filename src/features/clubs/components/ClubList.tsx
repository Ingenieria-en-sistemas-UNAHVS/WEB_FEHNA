import type { Club } from "../types/club.types";
import { ClubCard } from "./ClubCard";
export function ClubList({ clubs }: { clubs: Club[] }) { return clubs.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{clubs.map((club) => <ClubCard key={club.id} club={club} />)}</div> : <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center text-sm text-muted-foreground">No encontramos clubes con esos criterios.</div>; }
