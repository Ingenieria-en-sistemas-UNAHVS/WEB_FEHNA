import type { Responsibility } from "../types/about.types";

// Áreas de las que se encarga la federación.
export const RESPONSIBILIDADES: Responsibility[] = [
  {
    id: "competencias",
    titulo: "Calendario nacional",
    descripcion:
      "Convoca, organiza y sanciona las competencias oficiales de piscina larga a lo largo del año.",
    icono: "competencias",
  },
  {
    id: "seleccion",
    titulo: "Selecciones nacionales",
    descripcion:
      "Define los criterios de selección y conforma los equipos que representan a Honduras.",
    icono: "seleccion",
  },
  {
    id: "clubes",
    titulo: "Clubes afiliados",
    descripcion:
      "Mantiene la afiliación de los clubes del país y coordina con ellos la actividad competitiva.",
    icono: "clubes",
  },
  {
    id: "registro",
    titulo: "Registro y marcas",
    descripcion:
      "Lleva el registro oficial de deportistas, resultados y récords nacionales.",
    icono: "registro",
  },
  {
    id: "formacion",
    titulo: "Formación",
    descripcion:
      "Impulsa la capacitación de entrenadores y oficiales, y el desarrollo de las categorías formativas.",
    icono: "formacion",
  },
  {
    id: "representacion",
    titulo: "Representación internacional",
    descripcion:
      "Gestiona la participación de Honduras ante los organismos y competencias del exterior.",
    icono: "representacion",
  },
];
