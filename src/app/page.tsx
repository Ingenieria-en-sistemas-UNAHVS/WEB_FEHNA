import { getNoticiasPublicas } from "@/lib/data/noticias";
import { getEventosPublicos } from "@/lib/data/eventos";
import { getDeportistasPublicos } from "@/lib/data/deportistas";
import { getTiemposRanking } from "@/lib/data/tiempos";
import { getPatrocinadoresPublicos } from "@/lib/data/patrocinadores";

import { Navbar } from "@/modules/navigation";
import { HeroSection } from "@/components/public/hero";
import { NoticiasSection } from "@/components/public/noticias-section";
import { EventosSection } from "@/components/public/eventos-section";
import { AtletasSection } from "@/components/public/atletas-section";
import { RankingsSection } from "@/components/public/rankings-section";
import { RegistroSection } from "@/components/public/registro-section";
import { GaleriaSection } from "@/components/public/galeria-section";
import { PatrocinadoresSection } from "@/components/public/patrocinadores-section";
import { ContactoSection } from "@/components/public/contacto-section";
import { FooterSection } from "@/components/public/footer";
import { SwimmingClassificationsSection } from "@/modules/home/sections/swimming-classifications";

export default async function HomePage() {
  const [noticias, eventos, deportistas, tiempos, patrocinadores] = await Promise.all([
    getNoticiasPublicas(),
    getEventosPublicos(),
    getDeportistasPublicos(),
    getTiemposRanking(),
    getPatrocinadoresPublicos(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <SwimmingClassificationsSection />
      <NoticiasSection noticias={noticias} />
      <EventosSection eventos={eventos} />
      <AtletasSection deportistas={deportistas} />
      <RankingsSection tiempos={tiempos} />
      <RegistroSection />
      <GaleriaSection />
      <PatrocinadoresSection patrocinadores={patrocinadores} visible={true} />
      <ContactoSection />
      <FooterSection />
    </div>
  );
}
