import Link from "next/link";
import { ArrowRight, CalendarRange } from "lucide-react";
import { ROUTES } from "@/features/navigation";
import { EventCard } from "../components/EventCard";
import { selectHomeEvents } from "../lib/event-date";
import type { CalendarEvent } from "../types/event.types";

export function EventsPreviewSection({ events }: { events: CalendarEvent[] }) {
  const selected = selectHomeEvents(events, new Date(), 3);

  return (
    <section id="calendario" className="bg-secondary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <CalendarRange size={16} aria-hidden="true" />
              Calendario FEHNA
            </div>
            <h2
              className="max-w-[12ch] text-5xl font-black uppercase leading-[0.9] tracking-[-0.025em] text-white sm:text-6xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              La próxima salida empieza aquí
            </h2>
            <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-[#9bc4db] sm:text-base">
              Competencias, prácticas y encuentros para seguir el pulso de la comunidad acuática nacional.
            </p>
          </div>
          <Link
            href={ROUTES.calendarioPagina}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#061529] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
          >
            Ver más eventos <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {selected.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-card/40 px-6 py-16 text-center">
            <p className="font-semibold text-white">El calendario está tomando forma.</p>
            <p className="mt-2 text-sm text-[#9bc4db]">
              Publicaremos los próximos eventos tan pronto estén confirmados.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr] lg:grid-rows-2">
            <EventCard
              event={selected[0]}
              variant="featured"
              className="lg:row-span-2"
            />
            {selected.slice(1).map((event) => (
              <EventCard key={event.id} event={event} variant="compact" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

