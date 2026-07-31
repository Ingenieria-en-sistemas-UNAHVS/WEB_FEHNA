import type { NavItem, NavLink } from "../types/navigation.types";

/**
 * Fuente única de las rutas del sitio público.
 *
 * Cómo agregar una página nueva:
 *   1. Declarar su ruta aquí en ROUTES (nunca strings sueltos dentro de los componentes).
 *   2. Crear el archivo `src/app/<ruta>/page.tsx`.
 *   3. Enlazarla desde MAIN_NAV, o desde SOBRE_NOSOTROS_ITEMS si cuelga de ese menú.
 *
 * Las secciones que todavía viven dentro de la home se enlazan como ancla ("/#id",
 * donde `id` es el del <section> correspondiente). Cuando una de ellas pase a página
 * propia basta con cambiar su valor aquí: los componentes del navbar no se tocan.
 */
export const ROUTES = {
  home: "/",

  // Secciones de la home.
  inicio: "/#inicio",
  noticias: "/#noticias",
  calendario: "/#calendario",
  atletas: "/#atletas",
  galeria: "/#galeria",
  contacto: "/#contacto",

  // Sobre Nosotros: páginas institucionales todavía no implementadas.
  // "Historia" llega con el issue #6; las demás quedan reservadas.
  historia: "/sobre-nosotros/historia",
  juntaDirectiva: "/sobre-nosotros/junta-directiva",
  documentos: "/sobre-nosotros/documentos",
} as const;

// Submenú de "Sobre Nosotros". `proximamente` mantiene el item visible pero sin
// enlace activo mientras su página no exista, para no dejar enlaces rotos.
// Al implementar una de estas páginas, quitar su `proximamente`.
const SOBRE_NOSOTROS_ITEMS: NavLink[] = [
  { tipo: "link", label: "Historia", href: ROUTES.historia, proximamente: true },
  { tipo: "link", label: "Junta Directiva", href: ROUTES.juntaDirectiva, proximamente: true },
  { tipo: "link", label: "Documentos", href: ROUTES.documentos, proximamente: true },
];

/** Orden de aparición en el navbar; desktop y móvil comparten esta misma lista. */
export const MAIN_NAV: NavItem[] = [
  { tipo: "link", label: "Inicio", href: ROUTES.inicio },
  { tipo: "link", label: "Noticias", href: ROUTES.noticias },
  { tipo: "link", label: "Calendario", href: ROUTES.calendario },
  { tipo: "link", label: "Atletas", href: ROUTES.atletas },
  { tipo: "link", label: "Galería", href: ROUTES.galeria },
  { tipo: "dropdown", label: "Sobre Nosotros", items: SOBRE_NOSOTROS_ITEMS },
  { tipo: "link", label: "Contacto", href: ROUTES.contacto },
];
