import type { Metadata } from "next";
import { AboutPage } from "@/modules/about";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Federación Hondureña de Natación",
  description:
    "Qué es la Federación Hondureña de Natación, qué hace y de qué se encarga.",
};

// Ruta mínima: solo monta el módulo. El enlace desde el navbar y la
// navegación entre páginas institucionales se resuelven en el issue #7.
export default function SobreNosotrosPage() {
  return <AboutPage />;
}
