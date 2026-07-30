import type { Authority } from "../types/about.types";

// TODO(#6): confirmar con la federación los nombres, fotos y periodo de la
// junta directiva. Se dejan los cargos para que la sección tenga su forma
// final; cada card sin `nombre` se muestra como "Por confirmar".
export const AUTORIDADES: Authority[] = [
  { id: "presidencia", cargo: "Presidencia" },
  { id: "vicepresidencia", cargo: "Vicepresidencia" },
  { id: "secretaria", cargo: "Secretaría" },
  { id: "tesoreria", cargo: "Tesorería" },
  { id: "vocalia", cargo: "Vocalía" },
];
