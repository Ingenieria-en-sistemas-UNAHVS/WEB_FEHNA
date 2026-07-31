import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ABOUT_INTRO } from "../data/about-content";

// Encabezado de la página institucional. Incluye un enlace de regreso al
// inicio; la navegación definitiva se resuelve en el issue de ruteo (#7).
export function AboutIntroSection() {
  return (
    <section className="pt-20 pb-16 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        <div className="text-accent text-xs tracking-widest uppercase mb-2">
          {ABOUT_INTRO.eyebrow}
        </div>
        <h1
          className="text-5xl md:text-6xl font-black text-white uppercase leading-none"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {ABOUT_INTRO.titulo}
        </h1>
        <p className="text-muted-foreground mt-6 leading-relaxed max-w-2xl">
          {ABOUT_INTRO.entradilla}
        </p>
      </div>
    </section>
  );
}
