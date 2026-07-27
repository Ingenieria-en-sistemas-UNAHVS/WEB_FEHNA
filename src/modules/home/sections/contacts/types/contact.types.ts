// Tipos de la sección Contactos (issue #10).

/** Canales de contacto soportados. */
export type ContactChannel =
  | "whatsapp"
  | "correo"
  | "instagram"
  | "facebook"
  | "youtube"
  | "x";

/** Una entrada dentro de un canal. */
export interface ContactEntry {
  /** Valor mostrado (número, correo, usuario). Vacío = no se muestra. */
  valor: string;
  /** Enlace de acción; si falta, se deriva según el canal. */
  href?: string;
  /** Etiqueta de persona/área; si falta, se muestra genérico. */
  etiqueta?: string;
  /** Se muestra sin enlace activo aunque no tenga valor ("Próximamente..."). */
  proximamente?: boolean;
}

/** Entradas de un mismo canal (whatsapp y correo admiten varias). */
export interface ContactChannelData {
  canal: ContactChannel;
  entradas: ContactEntry[];
}
