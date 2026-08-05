import type { RedSocialRow, InfoContactoRow } from "@/lib/data/contacto";
import { SocialCard } from "./components/SocialCard";
import { InfoCard } from "./components/InfoCard";
import { AffiliationCallout } from "./components/AffiliationCallout";

interface ContactsSectionProps {
  redes: RedSocialRow[];
  info: InfoContactoRow[];
}

export function ContactsSection({ redes, info }: ContactsSectionProps) {
  // Si no hay ni redes ni información visible, la sección no se renderiza.
  if (redes.length === 0 && info.length === 0) return null;

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Estamos para ayudarte
          </div>
          <h2
            className="text-5xl font-black text-white uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Contáctanos
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed max-w-xl mx-auto">
            Estos son los canales oficiales de la federación para consultas sobre
            afiliación, competencias, patrocinios o cualquier asunto relacionado
            con la natación hondureña.
          </p>
        </div>

        {info.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
            {info.map((item) => (
              <InfoCard key={item.id} info={item} />
            ))}
          </div>
        )}

        {redes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
            {redes.map((red) => (
              <SocialCard key={red.id} red={red} />
            ))}
          </div>
        )}

        <div className="max-w-5xl mx-auto mt-6">
          <AffiliationCallout />
        </div>
      </div>
    </section>
  );
}
