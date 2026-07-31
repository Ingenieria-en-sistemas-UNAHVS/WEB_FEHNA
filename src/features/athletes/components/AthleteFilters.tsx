"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

interface AthleteFiltersProps {
  search: string;
  gender: string;
  swimType: string;
  team: string;
  teams: string[];
  onSearchChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onSwimTypeChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onClear: () => void;
}

export function AthleteFilters({ search, gender, swimType, team, teams, onSearchChange, onGenderChange, onSwimTypeChange, onTeamChange, onClear }: AthleteFiltersProps) {
  const hasFilters = Boolean(search || gender || swimType || team);
  return (
    <div className="rounded-2xl border border-white/10 bg-card/70 p-4 shadow-lg shadow-black/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white"><SlidersHorizontal size={16} className="text-accent" /> Explorar atletas</div>
        {hasFilters && <button type="button" onClick={onClear} className="flex items-center gap-1 text-xs text-accent hover:text-white"><X size={14} /> Limpiar filtros</button>}
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <label className="relative block">
          <span className="sr-only">Buscar por nombre o club</span>
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar atleta o club" className="h-11 w-full rounded-lg border border-white/10 bg-secondary pl-10 pr-3 text-sm text-white placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
        </label>
        <label className="block"><span className="sr-only">Filtrar por sexo</span><select value={gender} onChange={(event) => onGenderChange(event.target.value)} className="h-11 w-full rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:border-accent focus:outline-none"><option value="">Todos los sexos</option><option value="F">Femenino</option><option value="M">Masculino</option></select></label>
        <label className="block"><span className="sr-only">Filtrar por tipo de nado</span><select value={swimType} onChange={(event) => onSwimTypeChange(event.target.value)} className="h-11 w-full rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:border-accent focus:outline-none"><option value="">Todos los tipos</option><option value="Natación">Natación</option><option value="Aguas abiertas">Aguas abiertas</option><option value="Clavados">Clavados</option><option value="Waterpolo">Waterpolo</option></select></label>
        <label className="block"><span className="sr-only">Filtrar por club</span><select value={team} onChange={(event) => onTeamChange(event.target.value)} className="h-11 w-full rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:border-accent focus:outline-none"><option value="">Todos los clubes</option>{teams.map((teamName) => <option key={teamName} value={teamName}>{teamName}</option>)}</select></label>
      </div>
    </div>
  );
}
