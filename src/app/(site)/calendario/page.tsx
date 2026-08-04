import type { Metadata } from "next";
import { EventsDirectory } from "@/features/events";
import { getPublicCalendarEvents } from "@/features/events/data/events.repository";

export const metadata: Metadata = {
  title: "Calendario de eventos | FEHNA",
  description:
    "Consulta competencias, prácticas y encuentros de la Federación Hondureña de Natación.",
};

export default async function CalendarioPage() {
  const events = await getPublicCalendarEvents();

  return <EventsDirectory events={events} />;
}
