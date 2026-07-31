// Barrel del módulo institucional "Sobre Nosotros" (issue #6).
// Uso: import { AboutPage } from "@/features/about";
export { AboutPage } from "./AboutPage";

// Secciones sueltas, para reutilizarlas en subpáginas institucionales
// (organigrama, datos adicionales) sin recomponer la página completa.
export { AboutIntroSection } from "./sections/AboutIntroSection";
export { IdentitySection } from "./sections/IdentitySection";
export { ResponsibilitiesSection } from "./sections/ResponsibilitiesSection";
export { HistorySection } from "./sections/HistorySection";
export { AuthoritiesSection } from "./sections/AuthoritiesSection";

export type {
  AboutBlock,
  Milestone,
  Responsibility,
  ResponsibilityIcon,
  Authority,
} from "./types/about.types";
