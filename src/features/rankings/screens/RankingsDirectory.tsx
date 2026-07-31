"use client";

import { useMemo, useState } from "react";
import { PublicPagination } from "@/components/shared/PublicPagination";
import { paginate } from "@/lib/pagination";
import { RankingFilters } from "../components/RankingFilters";
import { RankingTable } from "../components/RankingTable";
import { filterRankings, sortRankings, type RankingFilters as Filters } from "../lib/ranking-utils";
import type { RankingEntry, RankingSort } from "../types/ranking.types";

export function RankingsDirectory({ entries, clubs, initialPage = 1, initialSort = "points", initialFilters = {} }: { entries: RankingEntry[]; clubs: { id: string; name: string }[]; initialPage?: number; initialSort?: RankingSort; initialFilters?: Filters }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sort, setSort] = useState<RankingSort>(initialSort);
  const [page, setPage] = useState(initialPage);
  const filtered = useMemo(() => sortRankings(filterRankings(entries, filters), sort), [entries, filters, sort]);
  const pageInfo = paginate(filtered, initialPage, 10);
  const changeFilter = (key: keyof Filters, value: string) => { setFilters((current) => ({ ...current, [key]: value })); setPage(1); };
  const changeSort = (value: RankingSort) => { setSort(value); setPage(1); };
  return <main className="mx-auto max-w-7xl px-4 py-12 sm:py-16"><div className="mb-10 max-w-3xl"><p className="text-xs uppercase tracking-[0.22em] text-accent">Registro oficial FEHNA</p><h1 className="mt-3 text-6xl font-black uppercase leading-[0.88] text-white sm:text-8xl">Rankings <span className="text-accent">nacionales</span></h1><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">Consulta marcas, puntos y posiciones de atletas y clubes en competencias oficiales.</p></div><RankingFilters filters={filters} clubs={clubs} onChange={changeFilter} onClear={() => { setFilters({}); setPage(1); }} /><div className="mt-6 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{filtered.length} resultados · página {pageInfo.page} de {pageInfo.totalPages || 1}</p><label className="text-xs uppercase tracking-widest text-muted-foreground">Ordenar <select value={sort} onChange={(event) => changeSort(event.target.value as RankingSort)} className="ml-2 rounded border border-white/10 bg-secondary px-2 py-1 text-white"><option value="points">Puntos</option><option value="time">Mejor tiempo</option><option value="position">Posición</option><option value="date">Más recientes</option></select></label></div><div className="mt-4"><RankingTable entries={pageInfo.items} /></div><PublicPagination path="/rankings" page={pageInfo.page} totalPages={pageInfo.totalPages} params={{ sort, ...filters }} /></main>;
}
