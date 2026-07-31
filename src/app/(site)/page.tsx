import { HeroSection } from "@/features/home/sections/hero";
import { NoticiasSection } from "@/features/home/sections/noticias-section";
import { EventosSection } from "@/features/home/sections/eventos-section";
import { athletes, rankAthletes } from "@/features/athletes";
import { AthletesPreviewSection } from "@/features/athletes/sections/AthletesPreviewSection";
import { RankingsSection } from "@/features/home/sections/rankings-section";
import { RegistroSection } from "@/features/home/sections/registro-section";
import { GaleriaSection } from "@/features/home/sections/galeria-section";
import { PatrocinadoresSection } from "@/features/home/sections/patrocinadores-section";
import { ContactoSection } from "@/features/home/sections/contacts/ContactoSection";
import { SwimmingClassificationsSection } from "@/features/home/sections/swimming-classifications";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <HeroSection />
      <SwimmingClassificationsSection />
      <NoticiasSection noticias={[]} />
      <EventosSection eventos={[]} />
      <AthletesPreviewSection athletes={rankAthletes(athletes).slice(0, 3)} />
      <RankingsSection tiempos={[]} />
      <RegistroSection />
      <GaleriaSection />
      <PatrocinadoresSection patrocinadores={[]} visible={true} />
      <ContactoSection />
    </div>
  );
}
