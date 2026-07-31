import type { ContactChannelData } from "../types/contact.types";

// Datos reales de https://fehna.com/. Correo pendiente (no publicado);
// X sin cuenta confirmada → se muestra como "Próximamente...".
export const CONTACTOS_MOCK: ContactChannelData[] = [
  {
    canal: "whatsapp",
    entradas: [
      { valor: "+504 9286-7064", href: "https://wa.me/50492867064" },
    ],
  },
  {
    canal: "instagram",
    entradas: [
      { valor: "@fehna_hn", href: "https://www.instagram.com/fehna_hn/" },
    ],
  },
  {
    canal: "facebook",
    entradas: [
      {
        valor: "Federación Hondureña de Natación",
        href: "https://www.facebook.com/p/Federacion-Hondure%C3%B1a-de-Natacion-100042936587988/",
      },
    ],
  },
  {
    canal: "youtube",
    entradas: [
      { valor: "@Fehna", href: "https://www.youtube.com/@Fehna" },
    ],
  },
  {
    canal: "correo",
    entradas: [
      { valor: "" }, // TODO: correo oficial
    ],
  },
  {
    canal: "x",
    entradas: [
      { valor: "", proximamente: true },
    ],
  },
];
