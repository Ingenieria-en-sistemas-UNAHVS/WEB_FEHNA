import type { Metadata } from "next";
import { EVENTS_MOCK, EventsDirectory } from "@/features/events";

export const metadata: Metadata = {
  title: "Calendario de eventos | FEHNA",
  description:
    "Consulta competencias, prácticas y encuentros de la Federación Hondureña de Natación.",
};

export default function CalendarioPage() {
  return <EventsDirectory events={EVENTS_MOCK} />;
}
