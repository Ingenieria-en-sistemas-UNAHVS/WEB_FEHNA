import { HeroSection } from "@/features/home/sections/hero";
import { NoticiasSection } from "@/features/home/sections/noticias-section";
import { athletes, rankAthletes } from "@/features/athletes";
import { AthletesPreviewSection } from "@/features/athletes/sections/AthletesPreviewSection";
import { RankingsSection } from "@/features/home/sections/rankings-section";
import { GaleriaSection } from "@/features/home/sections/galeria-section";
import { PatrocinadoresSection } from "@/features/home/sections/patrocinadores-section";
import { SwimmingClassificationsSection } from "@/features/home/sections/swimming-classifications";
import { EVENTS_MOCK, EventsPreviewSection } from "@/features/events";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <HeroSection />
      <SwimmingClassificationsSection />
      <EventsPreviewSection events={EVENTS_MOCK} />
      <NoticiasSection noticias={[]} />
      <AthletesPreviewSection athletes={rankAthletes(athletes).slice(0, 3)} />
      <RankingsSection tiempos={[]} />
      <GaleriaSection />
      <PatrocinadoresSection patrocinadores={[]} visible={true} />
    </div>
  );
}
