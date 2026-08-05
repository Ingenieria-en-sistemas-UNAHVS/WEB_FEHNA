import { getRedesSociales, getInformacionContacto } from "@/lib/data/contacto";
import { ContactsSection } from "@/features/home/sections/contacts";

export default async function ContactoPage() {
  const [redes, info] = await Promise.all([
    getRedesSociales(),
    getInformacionContacto(),
  ]);

  return <ContactsSection redes={redes} info={info} />;
}
