// Tipos de la navegación del sitio público (issue #7).

/** Entrada simple: enlaza a una página o a una sección de la home. */
export interface NavLink {
  tipo: "link";
  label: string;
  /** Ruta ("/sobre-nosotros/historia") o ancla de la home ("/#noticias"). */
  href: string;
  /** Se muestra sin enlace activo: la página todavía no existe. */
  proximamente?: boolean;
}

/** Entrada con submenú; agrupa rutas relacionadas. */
export interface NavDropdown {
  tipo: "dropdown";
  label: string;
  items: NavLink[];
}

export type NavItem = NavLink | NavDropdown;
