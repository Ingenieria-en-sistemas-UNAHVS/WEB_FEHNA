"use client";

import { useState, useMemo } from "react";
import type { TiempoRow } from "@/lib/data/tiempos";
import { formatearTiempo } from "@/lib/tiempo";

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function fechaLarga(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()][0] + MESES[d.getMonth()].slice(1).toLowerCase()} ${d.getFullYear()}`;
}

interface TiempoUI {
  id: number;
  pos: number;
  nombre: string;
  club: string;
  departamento: string;
  categoria: string;
  prueba: string;
  tiempo: string;
  centesimas: number;
  fecha: string;
  lugar: string;
}

interface Props {
  tiempos: TiempoRow[];
}

export function RankingsSection({ tiempos: rawTiempos }: Props) {
  const [prueba, setPrueba] = useState("Todas");
  const [categoria, setCategoria] = useState("Todas");
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState<"pos" | "tiempo" | "nombre" | "club">("tiempo");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const tiempos: TiempoUI[] = useMemo(
    () =>
      rawTiempos.map((t) => ({
        id: t.id,
        pos: t.posicion ?? 0,
        nombre: t.deportistas ? `${t.deportistas.nombres} ${t.deportistas.apellidos}` : "—",
        club: t.deportistas?.clubes?.nombre ?? "—",
        departamento: t.deportistas?.clubes?.ciudad ?? "",
        categoria: t.categorias?.nombre ?? "",
        prueba: t.pruebas ? `${t.pruebas.distancia}m ${t.pruebas.estilos?.nombre ?? ""}`.trim() : "",
        tiempo: formatearTiempo(t.tiempo_final),
        centesimas: t.tiempo_final,
        fecha: t.eventos ? fechaLarga(t.eventos.fecha_inicio) : "",
        lugar: t.eventos?.sede ?? t.eventos?.nombre ?? "",
      })),
    [rawTiempos]
  );

  const PRUEBAS = useMemo(
    () => ["Todas", ...Array.from(new Set(tiempos.map((t) => t.prueba).filter(Boolean)))],
    [tiempos]
  );
  const CATEGORIAS = useMemo(
    () => ["Todas", ...Array.from(new Set(tiempos.map((t) => t.categoria).filter(Boolean)))],
    [tiempos]
  );

  const filtered = tiempos
    .filter((r) => prueba === "Todas" || r.prueba === prueba)
    .filter((r) => categoria === "Todas" || r.categoria === categoria)
    .filter(
      (r) =>
        search === "" ||
        r.nombre.toLowerCase().includes(search.toLowerCase()) ||
        r.club.toLowerCase().includes(search.toLowerCase()) ||
        r.departamento.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let va: string | number = a[sortCol];
      let vb: string | number = b[sortCol];
      if (sortCol === "tiempo") {
        va = a.centesimas;
        vb = b.centesimas;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortCol }) => (
    <span className={`ml-1 text-xs ${sortCol === col ? "text-accent" : "text-white/20"}`}>
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const medalColor = (pos: number) =>
    pos === 1 ? "text-yellow-400" : pos === 2 ? "text-slate-300" : pos === 3 ? "text-amber-600" : "text-muted-foreground";

  return (
    <section id="tiempos" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">Rendimiento oficial</div>
          <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Registro de Tiempos</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">Mejores marcas por prueba y categoría registradas en competencias oficiales FEHNA 2025.</p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Buscar nadador, club, departamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-white/10 rounded px-4 py-2.5 text-white text-sm focus:border-accent focus:outline-none transition-colors placeholder-white/25 pr-8"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">×</button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => setCategoria(c)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all duration-200 tracking-wider uppercase ${categoria === c ? "bg-accent text-[#061529]" : "border border-white/15 text-white/50 hover:text-white hover:border-white/30"}`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {PRUEBAS.map((p) => (
              <button
                key={p}
                onClick={() => setPrueba(p)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 ${prueba === p ? "bg-primary text-white" : "border border-white/10 text-white/40 hover:text-white hover:border-white/25"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mb-3">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-secondary border-b border-white/10">
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider w-12">#</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none" onClick={() => toggleSort("nombre")}>Nadador <SortIcon col="nombre" /></th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none" onClick={() => toggleSort("club")}>Club <SortIcon col="club" /></th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Departamento</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Prueba</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none" onClick={() => toggleSort("tiempo")}>Tiempo <SortIcon col="tiempo" /></th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">Competencia</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-muted-foreground text-sm">
                      No se encontraron resultados para los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-card transition-colors duration-150 group">
                      <td className="px-4 py-3">
                        <span className={`font-black text-base ${medalColor(r.pos)}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {r.pos === 1 ? "🥇" : r.pos === 2 ? "🥈" : r.pos === 3 ? "🥉" : r.pos || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white font-semibold group-hover:text-accent transition-colors">{r.nombre}</span>
                      </td>
                      <td className="px-4 py-3 text-white/70">{r.club}</td>
                      <td className="px-4 py-3 text-white/50 text-xs">{r.departamento}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold ${r.categoria === "Absoluta" ? "bg-primary/20 text-[#38d9f5]" : r.categoria === "Junior" ? "bg-accent/15 text-accent" : r.categoria === "Juvenil" ? "bg-purple-500/15 text-purple-300" : "bg-white/10 text-white/50"}`}>
                          {r.categoria}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-xs whitespace-nowrap">{r.prueba}</td>
                      <td className="px-4 py-3">
                        <span className="text-white font-black text-base tabular-nums" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{r.tiempo}</span>
                        <span className="text-muted-foreground text-xs ml-1">seg</span>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{r.fecha}</td>
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{r.lugar}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.5 rounded font-bold">RN</span> Récord Nacional
          </div>
          <div className="flex items-center gap-1.5">
            <span>🥇🥈🥉</span> Posición en competencia
          </div>
          <div className="flex items-center gap-1.5 ml-auto">Haz clic en los encabezados para ordenar</div>
        </div>
      </div>
    </section>
  );
}
