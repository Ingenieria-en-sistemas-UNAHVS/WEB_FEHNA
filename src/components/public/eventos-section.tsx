"use client";

import { useState, useMemo } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import type { EventoRow } from "@/lib/data/eventos";

const DISCIPLINES = ["Todos", "Natación", "Clavados", "Waterpolo", "Sincronizado"];
const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

interface Props {
  eventos: EventoRow[];
}

function formatEvent(ev: EventoRow) {
  const d = new Date(ev.fecha_inicio + "T00:00:00");
  return {
    id: ev.id,
    date: `${d.getDate()} ${MESES[d.getMonth()][0] + MESES[d.getMonth()].slice(1).toLowerCase()}`,
    month: MESES[d.getMonth()],
    title: ev.nombre,
    location: ev.sede ?? "",
    type: "Oficial",
    level: ev.tipos_piscina?.nombre ?? "",
  };
}

export function EventosSection({ eventos }: Props) {
  const [calendarFilter, setCalendarFilter] = useState("Todos");

  const formatted = useMemo(() => eventos.map(formatEvent), [eventos]);
  const filtered = calendarFilter === "Todos" ? formatted : formatted.filter((e) => {
    if (calendarFilter === "Sincronizado") return e.title.toLowerCase().includes("sincronizado");
    return e.title.toLowerCase().includes(calendarFilter.toLowerCase());
  });

  return (
    <section id="calendario" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-accent text-xs tracking-widest uppercase mb-2">2025 · 2026</div>
            <h2 className="text-5xl font-black text-white uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Calendario de Competencias</h2>
          </div>
          <button onClick={() => document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" })} className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 bg-accent text-[#061529] font-bold rounded text-sm hover:bg-white transition-all duration-200" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
            VER CALENDARIO COMPLETO <ArrowRight size={14} />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {DISCIPLINES.map((d) => (
            <button
              key={d}
              onClick={() => setCalendarFilter(d)}
              className={`px-4 py-1.5 rounded text-sm font-semibold transition-all duration-200 ${calendarFilter === d ? "bg-accent text-[#061529]" : "border border-white/15 text-white/60 hover:text-white hover:border-white/30"}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/40 text-sm border border-dashed border-white/10 rounded-xl">
            No hay eventos en el calendario por ahora.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((ev) => (
              <div key={ev.id} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-white/5 hover:border-accent/30 transition-all duration-200 group cursor-pointer">
                <div className="shrink-0 w-14 h-14 bg-accent/10 border border-accent/20 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-accent text-xs font-bold tracking-widest uppercase">{ev.month}</span>
                  <span className="text-white font-black text-xl leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{ev.date.split(" ")[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-base leading-tight group-hover:text-accent transition-colors">{ev.title}</h4>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                    <MapPin size={11} /> {ev.location}
                  </div>
                </div>
                <div className="shrink-0 hidden sm:flex items-center">
                  <span className="text-xs border border-white/10 text-white/40 px-2 py-1 rounded">{ev.level}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
