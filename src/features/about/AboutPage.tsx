import { AboutIntroSection } from "./sections/AboutIntroSection";
import { IdentitySection } from "./sections/IdentitySection";
import { ResponsibilitiesSection } from "./sections/ResponsibilitiesSection";
import { HistorySection } from "./sections/HistorySection";
import { AuthoritiesSection } from "./sections/AuthoritiesSection";

// Composición de la página institucional. Cada sección es independiente y
// puede reutilizarse en subpáginas futuras (organigrama, datos adicionales)
// sin tocar este archivo.
export function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AboutIntroSection />
      <IdentitySection />
      <ResponsibilitiesSection />
      <HistorySection />
      <AuthoritiesSection />
    </main>
  );
}
