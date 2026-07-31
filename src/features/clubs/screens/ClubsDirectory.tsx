"use client";

import { useMemo, useState } from "react";
import { PublicPagination } from "@/components/shared/PublicPagination";
import { paginate } from "@/lib/pagination";
import { ClubFilters } from "../components/ClubFilters";
import { ClubList } from "../components/ClubList";
import { rankClubs } from "../lib/club-stats";
import type { Club, ClubSort } from "../types/club.types";

export function ClubsDirectory({ clubs, initialPage = 1, initialSort = "points", initialSearch = "" }: { clubs: Club[]; initialPage?: number; initialSort?: ClubSort; initialSearch?: string }) { const [search, setSearch] = useState(initialSearch); const [sort, setSort] = useState<ClubSort>(initialSort); const filtered = useMemo(() => rankClubs(clubs.filter((club) => `${club.name} ${club.city} ${club.department}`.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim())), sort), [clubs, search, sort]); const pageInfo = paginate(filtered, initialPage, 6); return <main className="mx-auto max-w-7xl px-4 py-12 sm:py-16"><div className="mb-10 max-w-3xl"><p className="text-xs uppercase tracking-[0.22em] text-accent">La comunidad federada</p><h1 className="mt-3 text-6xl font-black uppercase leading-[0.88] text-white sm:text-8xl">Clubes <span className="text-accent">afiliados</span></h1><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">Conoce los equipos que forman parte de FEHNA, sus atletas y el rendimiento que han construido en competencia.</p></div><ClubFilters search={search} sort={sort} onSearch={setSearch} onSort={setSort} /><div className="mt-8 flex items-center justify-between text-sm text-muted-foreground"><span><b className="text-white">{filtered.length}</b> clubes encontrados</span><span>Página {pageInfo.page} de {pageInfo.totalPages || 1}</span></div><div className="mt-4"><ClubList clubs={pageInfo.items} /></div><PublicPagination path="/clubes" page={pageInfo.page} totalPages={pageInfo.totalPages} params={{ q: search, sort }} /></main>; }
