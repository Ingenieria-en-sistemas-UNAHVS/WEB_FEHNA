// Tipos de la sección Clasificaciones de nado oficial (issue #8).

/** Una clasificación de nado oficial reconocida por la federación. */
export interface SwimmingClassification {
  /** Identificador estable; sirve de key y de referencia a futuro. */
  id: string;
  /** Nombre visible de la clasificación. */
  nombre: string;
  /** Explicación breve; opcional para que la card no dependa de ella. */
  descripcion?: string;
  /** Imagen ilustrativa; si falta, la card muestra un marcador. */
  imageUrl?: string;
  /** Desde cuándo se integró (año o referencia libre). */
  desde?: string;
}
