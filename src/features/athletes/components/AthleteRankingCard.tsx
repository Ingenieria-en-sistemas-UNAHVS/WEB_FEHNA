import { Trophy } from "lucide-react";
import type { RankedAthlete } from "../types/athlete.types";
import { AthleteCard } from "./AthleteCard";

export function AthleteRankingCard({ athlete }: { athlete: RankedAthlete }) {
  return (
    <div className="relative">
      <div className="absolute -top-3 left-5 z-10 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-[#061529]">
        <Trophy size={12} fill="currentColor" /> #{athlete.rankingPosition}
      </div>
      <AthleteCard athlete={athlete} compact />
    </div>
  );
}
