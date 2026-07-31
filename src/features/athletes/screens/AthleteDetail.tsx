import { PerformanceSummary } from "../components/PerformanceSummary";
import { AthleteProfileHeader } from "../components/AthleteProfileHeader";
import { CompetitionHistory } from "../components/CompetitionHistory";
import { MedalsSummary } from "../components/MedalsSummary";
import { TimeHistory } from "../components/TimeHistory";
import type { RankedAthlete } from "../types/athlete.types";

export function AthleteDetail({ athlete }: { athlete: RankedAthlete }) {
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14"><AthleteProfileHeader athlete={athlete} /><div className="mt-6"><PerformanceSummary athlete={athlete} /></div><div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]"><div className="space-y-14"><CompetitionHistory competitions={athlete.competitions} /><TimeHistory performances={athlete.performances} /></div><MedalsSummary medals={athlete.medals} /></div></div>;
}
