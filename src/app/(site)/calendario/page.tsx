import type { Metadata } from "next";
import { EventsDirectory } from "@/features/events";
import { getEventosPublicos, getPortadasPorEntidad, getTiemposRanking } from "@/lib/data";
import { aEventosCalendario } from "@/lib/mappers";

export const metadata: Metadata = {
  title: "Calendario de eventos | FEHNA",
  description:
    "Consulta competencias, prácticas y encuentros de la Federación Hondureña de Natación.",
};

export default async function CalendarioPage() {
  const [eventos, tiempos, portadas] = await Promise.all([
    getEventosPublicos(),
    getTiemposRanking(),
    getPortadasPorEntidad("eventos"),
  ]);

  return <EventsDirectory events={aEventosCalendario(eventos, tiempos, portadas)} />;
}
