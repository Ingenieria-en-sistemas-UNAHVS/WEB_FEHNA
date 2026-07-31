"use client";

import { useMemo, useState } from "react";
import { SearchX, UsersRound } from "lucide-react";
import { AthleteFilters } from "../components/AthleteFilters";
import { AthleteList } from "../components/AthleteList";
import type { RankedAthlete } from "../types/athlete.types";

export function AthletesDirectory({ athletes }: { athletes: RankedAthlete[] }) {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [swimType, setSwimType] = useState("");
  const [team, setTeam] = useState("");
  const teams = useMemo(() => [...new Set(athletes.map((athlete) => athlete.team.name))].sort(), [athletes]);
  const filtered = useMemo(() => athletes.filter((athlete) => {
    const term = search.toLocaleLowerCase().trim();
    const matchesSearch = !term || `${athlete.firstName} ${athlete.lastName} ${athlete.team.name}`.toLocaleLowerCase().includes(term);
    const matchesGender = !gender || athlete.gender === gender;
    const matchesSwimType = !swimType || athlete.bestPerformance.swimType === swimType;
    const matchesTeam = !team || athlete.team.name === team;
    return matchesSearch && matchesGender && matchesSwimType && matchesTeam;
  }), [athletes, gender, search, swimType, team]);
  const clearFilters = () => { setSearch(""); setGender(""); setSwimType(""); setTeam(""); };

  return <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16"><div className="mb-10 max-w-3xl"><p className="text-xs uppercase tracking-[0.22em] text-accent">El equipo de Honduras</p><h1 className="mt-3 text-6xl font-black uppercase leading-[0.88] text-white sm:text-8xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Directorio de <span className="text-accent">atletas</span></h1><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">Explora los perfiles, marcas y resultados de los nadadores que representan a la Federación Hondureña de Natación.</p></div><div className="mb-8 grid gap-3 sm:grid-cols-3"><Metric icon={<UsersRound size={17} />} label="Atletas registrados" value={athletes.length.toString().padStart(2, "0")} /><Metric icon={<SearchX size={17} />} label="Mostrando ahora" value={filtered.length.toString().padStart(2, "0")} /><Metric icon={<span className="text-base font-black">★</span>} label="Puntuación líder" value={`${athletes[0]?.totalPoints ?? 0}`} /></div><AthleteFilters search={search} gender={gender} swimType={swimType} team={team} teams={teams} onSearchChange={setSearch} onGenderChange={setGender} onSwimTypeChange={setSwimType} onTeamChange={setTeam} onClear={clearFilters} /><div className="mt-8 flex items-center justify-between gap-4"><p className="text-sm text-muted-foreground"><span className="font-bold text-white">{filtered.length}</span> atletas encontrados</p><p className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:block">Ordenados por puntuación</p></div><div className="mt-4"><AthleteList athletes={filtered} /></div></div>;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/60 p-4"><div className="text-accent">{icon}</div><div><p className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p></div></div>; }
