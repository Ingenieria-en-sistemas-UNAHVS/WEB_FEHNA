import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ROUTES } from "@/features/navigation";
import type { RankedAthlete } from "../types/athlete.types";
import { AthleteRankingCard } from "../components/AthleteRankingCard";

export function AthletesPreviewSection({ athletes }: { athletes: RankedAthlete[] }) {
  return <section id="atletas" className="bg-background py-24"><div className="mx-auto max-w-7xl px-4"><div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-accent"><Sparkles size={14} /> Orgullo nacional</div><h2 className="mt-2 text-5xl font-black uppercase leading-none text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Atletas destacados</h2><p className="mt-3 max-w-lg text-base text-muted-foreground">Conoce a quienes están llevando el nombre de Honduras a los mejores escenarios del deporte acuático.</p></div><Link href={ROUTES.atletasPagina} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent transition-colors hover:text-white">Ver todos los atletas <ArrowRight size={16} /></Link></div><div className="grid gap-5 lg:grid-cols-3">{athletes.slice(0, 3).map((athlete) => <AthleteRankingCard key={athlete.id} athlete={athlete} />)}</div></div></section>;
}
