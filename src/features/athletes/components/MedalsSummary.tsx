import { Medal } from "lucide-react";
import type { AthleteMedal } from "../types/athlete.types";
import { formatDate } from "../lib/formatters";

const medalStyles = { Oro: "border-amber-300/30 bg-amber-300/10 text-amber-200", Plata: "border-slate-300/30 bg-slate-300/10 text-slate-200", Bronce: "border-orange-400/30 bg-orange-400/10 text-orange-200" };

export function MedalsSummary({ medals }: { medals: AthleteMedal[] }) {
  return <section><div className="mb-5"><p className="text-xs uppercase tracking-[0.2em] text-accent">Palmarés</p><h2 className="mt-1 text-3xl font-black uppercase text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Medallas</h2></div>{medals.length === 0 ? <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground">Este atleta aún no tiene medallas registradas.</div> : <div className="grid gap-3 sm:grid-cols-2">{medals.map((medal) => <div key={medal.id} className={`rounded-xl border p-4 ${medalStyles[medal.type]}`}><div className="flex items-start gap-3"><Medal size={20} className="mt-0.5 shrink-0" /><div><p className="font-bold">Medalla de {medal.type}</p><p className="mt-1 text-sm text-white/80">{medal.eventName}</p><p className="mt-2 text-xs text-white/50">{medal.competitionName} · {formatDate(medal.date)}</p></div></div></div>)}</div>}</section>;
}
