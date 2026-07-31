// Tipos del módulo institucional "Sobre Nosotros" (issue #6).

/** Bloque narrativo con título y párrafos. Base de las secciones de texto. */
export interface AboutBlock {
  id: string;
  titulo: string;
  parrafos: string[];
}

/** Hito de la línea de tiempo de la federación. */
export interface Milestone {
  id: string;
  /** Año o referencia; si falta, el hito se muestra sin marca temporal. */
  anio?: string;
  titulo: string;
  descripcion?: string;
}

/** Claves de icono disponibles para las áreas de responsabilidad. */
export type ResponsibilityIcon =
  | "competencias"
  | "seleccion"
  | "clubes"
  | "registro"
  | "formacion"
  | "representacion";

/** Un área de la que se encarga la federación. */
export interface Responsibility {
  id: string;
  titulo: string;
  descripcion: string;
  icono: ResponsibilityIcon;
}

/** Persona con cargo dentro de la federación. */
export interface Authority {
  id: string;
  /** Cargo institucional; es el único campo obligatorio. */
  cargo: string;
  /** Nombre de la persona. Si falta, la card se muestra como pendiente. */
  nombre?: string;
  /** Foto opcional; si falta se usan las iniciales o un marcador. */
  fotoUrl?: string;
  /** Periodo del cargo, por ejemplo "2024 - 2028". */
  periodo?: string;
}
