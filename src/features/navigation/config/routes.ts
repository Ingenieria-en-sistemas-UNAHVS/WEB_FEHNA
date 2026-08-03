import type { NavItem } from "../types/navigation.types";

/** Registro único de rutas públicas y anclas de la portada. */
export const ROUTES = {
  home: "/",

  // Anclas de secciones que siguen viviendo en la portada.
  inicio: "/#inicio",
  noticias: "/#noticias",
  calendario: "/#calendario",
  atletas: "/#atletas",
  galeria: "/#galeria",
  contacto: "/#contacto",
  rankings: "/rankings",
  clubes: "/clubes",

  // Páginas públicas completas.
  sobreNosotros: "/sobre-nosotros",
  noticiasPagina: "/noticias",
  calendarioPagina: "/calendario",
  eventoDetalle: (id: string | number) => `/calendario/${id}`,
  atletasPagina: "/atletas",
  atletaDetalle: (id: string | number) => `/atletas/${id}`,
  clubDetalle: (id: string | number) => `/clubes/${id}`,
  galeriaPagina: "/galeria",
  contactoPagina: "/contacto",
} as const;

/** Orden compartido por navbar desktop y móvil. Todos los destinos existen. */
export const MAIN_NAV: NavItem[] = [
  { tipo: "link", label: "Inicio", href: ROUTES.inicio },
  { tipo: "link", label: "Noticias", href: ROUTES.noticiasPagina },
  { tipo: "link", label: "Calendario", href: ROUTES.calendarioPagina },
  { tipo: "link", label: "Atletas", href: ROUTES.atletasPagina },
  { tipo: "link", label: "Clubes", href: ROUTES.clubes },
  { tipo: "link", label: "Rankings", href: ROUTES.rankings },
  { tipo: "link", label: "Galería", href: ROUTES.galeriaPagina },
  { tipo: "link", label: "Sobre Nosotros", href: ROUTES.sobreNosotros },
  { tipo: "link", label: "Contacto", href: ROUTES.contactoPagina },
];
