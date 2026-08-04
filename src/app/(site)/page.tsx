import { HeroSection } from "@/features/home/sections/hero";
import { NoticiasSection } from "@/features/home/sections/noticias-section";
import { athletes, rankAthletes } from "@/features/athletes";
import { AthletesPreviewSection } from "@/features/athletes/sections/AthletesPreviewSection";
import { RankingsSection } from "@/features/home/sections/rankings-section";
import { GaleriaSection } from "@/features/home/sections/galeria-section";
import { PatrocinadoresSection } from "@/features/home/sections/patrocinadores-section";
import { SwimmingClassificationsSection } from "@/features/home/sections/swimming-classifications";
import { EventsPreviewSection } from "@/features/events";
import { getPublicCalendarEvents } from "@/features/events/data/events.repository";

export default async function HomePage() {
  const events = await getPublicCalendarEvents();

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <HeroSection />
      <SwimmingClassificationsSection />
      <EventsPreviewSection events={events} />
      <NoticiasSection noticias={[]} />
      <AthletesPreviewSection athletes={rankAthletes(athletes).slice(0, 3)} />
      <RankingsSection tiempos={[]} />
      <GaleriaSection />
      <PatrocinadoresSection patrocinadores={[]} visible={true} />
    </div>
  );
}
