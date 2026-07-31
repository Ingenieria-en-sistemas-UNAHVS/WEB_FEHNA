import Link from "next/link";
import { ArrowUpRight, Medal, Timer } from "lucide-react";
import { ROUTES } from "@/features/navigation";
import type { RankedAthlete } from "../types/athlete.types";
import { formatEventName, formatTime } from "../lib/formatters";

interface AthleteCardProps {
  athlete: RankedAthlete;
  compact?: boolean;
}

export function AthleteCard({ athlete, compact = false }: AthleteCardProps) {
  const initials = `${athlete.firstName[0]}${athlete.lastName[0]}`;
  const performance = athlete.bestPerformance;

  return (
    <Link href={ROUTES.atletaDetalle(athlete.id)} className="group block rounded-2xl border border-white/10 bg-card/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-accent/20 text-xl font-black text-accent" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {initials}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">{athlete.team.shortName}</p>
            <h3 className="mt-1 text-xl font-black uppercase leading-none text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{athlete.firstName} {athlete.lastName}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{athlete.team.name}</p>
          </div>
        </div>
        <ArrowUpRight size={18} className="text-white/30 transition-colors group-hover:text-accent" aria-hidden="true" />
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/60">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">{performance.swimType}</span>
        <span className="truncate">{formatEventName(performance)}</span>
      </div>

      <div className={`mt-5 grid ${compact ? "grid-cols-2" : "grid-cols-3"} gap-3 border-t border-white/10 pt-4`}>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Timer size={13} /> Mejor marca</div>
          <p className="mt-1 text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{formatTime(performance.timeMs)}</p>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Puntuación</div>
          <p className="mt-1 text-2xl font-black text-accent" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{athlete.totalPoints}</p>
        </div>
        {!compact && <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Medal size={13} /> Medallas</div>
          <p className="mt-1 text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{athlete.medals.length}</p>
        </div>}
      </div>
    </Link>
  );
}
