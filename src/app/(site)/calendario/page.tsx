import { getEventosPublicos } from "@/lib/data/eventos";
import { EventosSection } from "@/features/home/sections/eventos-section";

export default async function CalendarioPage() {
  return <EventosSection eventos={await getEventosPublicos()} />;
}
