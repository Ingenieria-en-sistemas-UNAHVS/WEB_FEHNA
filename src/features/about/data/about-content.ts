import type { AboutBlock } from "../types/about.types";

// Contenido institucional. Texto general y verificable; los datos
// específicos (fundación, hitos, autoridades) viven en sus propios
// archivos y están pendientes de confirmar con la federación.

/** Encabezado de la página institucional. */
export const ABOUT_INTRO = {
  eyebrow: "Sobre nosotros",
  titulo: "Federación Hondureña de Natación",
  entradilla:
    "Organismo rector de la natación en Honduras. Organiza el calendario nacional de competencias en piscina larga, afilia a los clubes del país y conforma las selecciones que representan a Honduras en el exterior.",
};

/** Bloques narrativos de "qué es" y "qué hace". */
export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    id: "que-es",
    titulo: "Qué es FEHNA",
    parrafos: [
      "La Federación Hondureña de Natación (FEHNA) es la entidad deportiva que rige la natación a nivel nacional. Agrupa a los clubes afiliados del país y define el marco bajo el cual se desarrollan las competencias oficiales.",
      "Su trabajo se concentra en las pruebas de natación en piscina larga, que son las que conforman el calendario oficial de la federación.",
    ],
  },
  {
    id: "que-hace",
    titulo: "Qué hace",
    parrafos: [
      "La federación organiza y sanciona las competencias nacionales, mantiene el registro oficial de deportistas y marcas, y coordina con los clubes la participación de sus atletas.",
      "También conforma las selecciones nacionales y gestiona la representación de Honduras en competencias internacionales.",
    ],
  },
];
