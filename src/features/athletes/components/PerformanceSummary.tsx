import { Gauge, Medal, Timer, Waves } from "lucide-react";
import type { AthletePerformance, RankedAthlete } from "../types/athlete.types";
import { formatEventName, formatTime } from "../lib/formatters";

export function PerformanceSummary({ athlete, performance }: { athlete: RankedAthlete; performance?: AthletePerformance }) {
  const best = performance ?? athlete.bestPerformance;
  const stats = [
    { icon: Gauge, label: "Puntuación total", value: athlete.totalPoints.toString(), accent: true },
    { icon: Timer, label: "Mejor tiempo", value: best ? formatTime(best.timeMs) : "—", accent: false },
    { icon: Waves, label: "Tipo de nado", value: best?.swimType ?? "—", accent: false },
    { icon: Medal, label: "Medallas", value: athlete.medals.length.toString(), accent: false },
  ];
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ icon: Icon, label, value, accent }) => <div key={label} className="rounded-xl border border-white/10 bg-card/70 p-4"><div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"><Icon size={14} className="text-accent" /> {label}</div><p className={`mt-3 text-2xl font-black ${accent ? "text-accent" : "text-white"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</p>{label === "Mejor tiempo" && best && <p className="mt-1 text-xs text-muted-foreground">{formatEventName(best)} · {best.course}</p>}</div>)}</div>;
}
