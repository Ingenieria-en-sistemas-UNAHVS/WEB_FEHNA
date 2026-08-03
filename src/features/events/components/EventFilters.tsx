import { CalendarDays, Search, SlidersHorizontal, X } from "lucide-react";
import {
  DISCIPLINE_OPTIONS,
  PARTICIPANT_CATEGORY_OPTIONS,
} from "../config/event-options";
import { hasEventFilters } from "../lib/event-filters";
import type { EventFiltersState } from "../types/event.types";

interface EventFiltersProps {
  filters: EventFiltersState;
  onChange: (next: EventFiltersState) => void;
  onClear: () => void;
}

const CONTROL_CLASS =
  "h-12 w-full rounded-xl border border-white/10 bg-[#081b32] px-3 text-sm text-white outline-none transition placeholder:text-[#719cb5] hover:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function EventFilters({ filters, onChange, onClear }: EventFiltersProps) {
  const active = hasEventFilters(filters);

  function update<Key extends keyof EventFiltersState>(
    key: Key,
    value: EventFiltersState[Key],
  ) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <section
      aria-labelledby="event-filters-title"
      className="border-y border-white/10 bg-[#07182d] py-5"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <SlidersHorizontal size={16} className="text-accent" aria-hidden="true" />
            <h2 id="event-filters-title">Filtrar calendario</h2>
          </div>
          {active && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-xs font-bold text-accent transition hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X size={14} aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <label className="relative">
            <span className="sr-only">Buscar evento por nombre o código</span>
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#719cb5]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => update("query", event.target.value)}
              placeholder="Buscar nombre, código o sede"
              className={`${CONTROL_CLASS} pl-10`}
            />
          </label>

          <label className="relative">
            <span className="sr-only">Filtrar por fecha</span>
            <CalendarDays
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#719cb5]"
              aria-hidden="true"
            />
            <input
              type="date"
              value={filters.date}
              onChange={(event) => update("date", event.target.value)}
              className={`${CONTROL_CLASS} pl-10 [color-scheme:dark]`}
            />
          </label>

          <label>
            <span className="sr-only">Filtrar por tipo de nado</span>
            <select
              value={filters.discipline}
              onChange={(event) =>
                update(
                  "discipline",
                  event.target.value as EventFiltersState["discipline"],
                )
              }
              className={CONTROL_CLASS}
            >
              <option value="">Todos los tipos de nado</option>
              {DISCIPLINE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filtrar por categoría de participantes</span>
            <select
              value={filters.participantCategory}
              onChange={(event) => update("participantCategory", event.target.value)}
              className={CONTROL_CLASS}
            >
              <option value="">Todas las categorías</option>
              {PARTICIPANT_CATEGORY_OPTIONS.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                  {category.ageRange ? ` · ${category.ageRange}` : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

