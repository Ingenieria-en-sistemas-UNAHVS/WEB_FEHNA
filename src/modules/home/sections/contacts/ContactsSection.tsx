import { CONTACT_CHANNEL_ORDER } from "./config/contact-channels";
import { CONTACTOS_MOCK } from "./data/contacts.mock";
import { ContactCard } from "./components/ContactCard";
import { AffiliationCallout } from "./components/AffiliationCallout";
import type { ContactChannelData } from "./types/contact.types";

interface ContactsSectionProps {
  /** Canales de contacto. Por defecto usa el mock; a futuro, datos reales. */
  contactos?: ContactChannelData[];
}

export function ContactsSection({ contactos = CONTACTOS_MOCK }: ContactsSectionProps) {
  // Solo canales con al menos una entrada visible, en el orden definido.
  const canalesConDatos = CONTACT_CHANNEL_ORDER.map((canal) =>
    contactos.find((c) => c.canal === canal)
  ).filter(
    (c): c is ContactChannelData =>
      !!c && c.entradas.some((e) => e.valor.trim() !== "" || e.proximamente)
  );

  // Si no hay ningún canal con datos, la sección no se renderiza.
  if (canalesConDatos.length === 0) return null;

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {canalesConDatos.map((c) => (
            <ContactCard key={c.canal} canal={c.canal} entradas={c.entradas} />
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-6">
          <AffiliationCallout />
        </div>
      </div>
    </section>
  );
}
