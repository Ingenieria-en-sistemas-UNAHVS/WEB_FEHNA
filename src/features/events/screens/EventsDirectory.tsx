"use client";

/**
 * THESIS: El calendario se lee como una cartelera deportiva activa, no como una cuadrícula genérica.
 * OWN-WORLD: Azul nocturno FEHNA, cyan funcional, fechas grandes y fotografía acuática documental.
 * STORY: La persona entiende qué viene, acota el calendario y reconoce cada evento de un vistazo.
 * FIRST VIEWPORT: Título editorial, próxima fecha en contexto y filtros inmediatamente disponibles.
 * FORM: Listado cronológico operativo dentro del sistema visual existente; extensión acotada, sin cambio de marca.
 */
import { useMemo, useState } from "react";
import { CalendarCheck2, SearchX } from "lucide-react";
import { EventFilters } from "../components/EventFilters";
import { EventList } from "../components/EventList";
import {
  EMPTY_EVENT_FILTERS,
  filterEvents,
  hasEventFilters,
} from "../lib/event-filters";
import type {
  CalendarEvent,
  EventFiltersState,
} from "../types/event.types";

export function EventsDirectory({ events }: { events: CalendarEvent[] }) {
  const [filters, setFilters] = useState<EventFiltersState>(EMPTY_EVENT_FILTERS);
  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters],
  );
  const filtersActive = hasEventFilters(filters);

  function clearFilters() {
    setFilters(EMPTY_EVENT_FILTERS);
  }

  return (
    <div className="pb-20 sm:pb-24">
      <header className="relative overflow-hidden border-b border-white/10 bg-[#07182d]">
        <div className="absolute -right-10 top-1/2 hidden -translate-y-1/2 text-[17rem] font-black leading-none tracking-[-0.04em] text-white/[0.025] lg:block" aria-hidden="true">
          FEHNA
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <div className="flex max-w-4xl items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
            <CalendarCheck2 size={16} aria-hidden="true" />
            Agenda deportiva
          </div>
          <h1
            id="events-directory-title"
            className="mt-4 max-w-[11ch] text-6xl font-black uppercase leading-[0.86] tracking-[-0.03em] text-white sm:text-8xl"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Calendario de eventos
          </h1>
          <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-[#a8cce0]">
            Consulta competencias, prácticas y encuentros de las disciplinas acuáticas federadas. Usa los filtros para encontrar la jornada que buscas.
          </p>
          <p className="mt-5 text-xs font-medium text-[#719cb5]">
            Contenido demostrativo para validar la experiencia visual.
          </p>
        </div>
      </header>

      <EventFilters
        filters={filters}
        onChange={setFilters}
        onClear={clearFilters}
      />

      <section
        className="mx-auto max-w-7xl px-4 pt-8 sm:pt-10"
        aria-labelledby="events-directory-title"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p
              className="text-sm text-[#9bc4db]"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <strong className="text-lg font-black text-white">
                {filteredEvents.length}
              </strong>{" "}
              {filteredEvents.length === 1 ? "evento encontrado" : "eventos encontrados"}
            </p>
            <p className="mt-1 text-xs text-[#719cb5]">
              En curso y próximos primero; después, los más recientes.
            </p>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} />
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-card/45 px-6 py-16 text-center">
            <SearchX size={28} className="mx-auto text-accent" aria-hidden="true" />
            <h2
              className="mt-4 text-3xl font-black uppercase text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {events.length === 0 ? "Aún no hay eventos publicados" : "No encontramos eventos"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#9bc4db]">
              {events.length === 0
                ? "Cuando haya nuevas jornadas disponibles, aparecerán en este calendario."
                : "Prueba otra fecha, disciplina o categoría para ampliar los resultados."}
            </p>
            {events.length > 0 && filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 min-h-11 rounded-xl bg-accent px-5 py-3 text-sm font-black text-[#061529] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Mostrar todo el calendario
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
