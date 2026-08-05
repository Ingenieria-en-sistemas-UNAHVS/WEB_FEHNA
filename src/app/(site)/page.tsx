import { HeroSection } from "@/features/home/sections/hero";
import { NoticiasSection } from "@/features/home/sections/noticias-section";
import { AthletesPreviewSection } from "@/features/athletes/sections/AthletesPreviewSection";
import { RankingsSection } from "@/features/home/sections/rankings-section";
import { GaleriaSection } from "@/features/home/sections/galeria-section";
import { PatrocinadoresSection } from "@/features/home/sections/patrocinadores-section";
import { SwimmingClassificationsSection } from "@/features/home/sections/swimming-classifications";
import { EventsPreviewSection } from "@/features/events";
import {
  esVisible,
  getDirectorioSitio,
  getEventosPublicos,
  getGaleriaPublica,
  getNoticiasPublicas,
  getPatrocinadoresPublicos,
  getPortadasPorEntidad,
  getSeccionesVisibles,
} from "@/lib/data";
import { aEventosCalendario, aGaleria } from "@/lib/mappers";

export default async function HomePage() {
  const [
    noticias,
    eventos,
    patrocinadores,
    medios,
    portadasEventos,
    secciones,
    directorio,
  ] = await Promise.all([
    getNoticiasPublicas(),
    getEventosPublicos(),
    getPatrocinadoresPublicos(),
    getGaleriaPublica(6),
    getPortadasPorEntidad("eventos"),
    getSeccionesVisibles(),
    getDirectorioSitio(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <HeroSection />
      <SwimmingClassificationsSection />
      <EventsPreviewSection
        events={aEventosCalendario(eventos, directorio.tiempos, portadasEventos)}
      />
      <NoticiasSection noticias={noticias} />
      <AthletesPreviewSection athletes={directorio.atletas.slice(0, 3)} />
      <RankingsSection tiempos={directorio.tiempos} />
      <GaleriaSection items={aGaleria(medios)} />
      <PatrocinadoresSection
        patrocinadores={patrocinadores}
        visible={esVisible(secciones, "patrocinadores")}
      />
    </div>
  );
}
