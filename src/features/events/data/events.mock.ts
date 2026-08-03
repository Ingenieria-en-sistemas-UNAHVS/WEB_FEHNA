import { PARTICIPANT_CATEGORY_OPTIONS } from "../config/event-options";
import type { CalendarEvent, EventSponsor } from "../types/event.types";

// Contenido demostrativo para validar la experiencia visual. No representa
// el calendario oficial ni patrocinadores confirmados de FEHNA.
const [infantil, juvenil, abierta, master] = PARTICIPANT_CATEGORY_OPTIONS;

const sponsors: Record<string, EventSponsor> = {
  aquaSport: { id: "sponsor-aquasport", name: "AquaSport" },
  cronoHn: { id: "sponsor-cronohn", name: "CronoHN" },
  hidroLab: { id: "sponsor-hidrolab", name: "HidroLab" },
  olaAzul: { id: "sponsor-ola-azul", name: "Ola Azul" },
};

export const EVENTS_MOCK: CalendarEvent[] = [
  {
    id: "festival-infantil-2026",
    code: "FEH-2608-INF",
    name: "Festival Nacional Infantil",
    description:
      "Jornada federada para las nuevas generaciones, con pruebas individuales y relevos por clubes.",
    startDate: "2026-08-15",
    location: "Complejo Deportivo José Simón Azcona, Tegucigalpa",
    type: "competition",
    image: {
      src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=800&fit=crop&auto=format",
      alt: "Nadadores compitiendo en una piscina durante una jornada deportiva",
    },
    sponsors: [sponsors.aquaSport, sponsors.cronoHn],
    disciplines: ["swimming"],
    participantCategories: [infantil],
    participantCount: 84,
  },
  {
    id: "copa-centroamericana-2026",
    code: "FEH-2609-CCA",
    name: "Copa Centroamericana de Natación",
    description:
      "Encuentro regional de piscina larga con atletas juveniles y de categoría abierta.",
    startDate: "2026-09-05",
    endDate: "2026-09-06",
    location: "Villa Olímpica, Tegucigalpa",
    type: "competition",
    image: {
      src: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=1200&h=800&fit=crop&auto=format",
      alt: "Piscina olímpica preparada para una competencia de natación",
    },
    sponsors: [sponsors.hidroLab],
    disciplines: ["swimming", "diving"],
    participantCategories: [juvenil, abierta],
    participantCount: 146,
  },
  {
    id: "practica-tecnica-octubre-2026",
    code: "FEH-2610-TEC",
    name: "Práctica Técnica Nacional",
    description:
      "Sesión abierta de técnica, salidas y virajes para atletas federados de nivel juvenil.",
    startDate: "2026-10-10",
    location: "Piscina Olímpica, San Pedro Sula",
    type: "practice",
    sponsors: [],
    disciplines: ["swimming"],
    participantCategories: [juvenil],
    participantCount: 48,
  },
  {
    id: "amistoso-acuatico-2026",
    code: "FEH-2611-AMT",
    name: "Encuentro Acuático Amistoso",
    description:
      "Programa de exhibición y convivencia entre clubes con waterpolo y natación artística.",
    startDate: "2026-11-21",
    location: "Centro Acuático Municipal, La Ceiba",
    type: "friendly",
    image: {
      src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=1200&h=800&fit=crop&auto=format",
      alt: "Equipo reunido junto a una piscina antes de una actividad acuática",
    },
    sponsors: [sponsors.olaAzul, sponsors.aquaSport],
    disciplines: ["water_polo", "artistic_swimming"],
    participantCategories: [juvenil, abierta],
    participantCount: 72,
  },
  {
    id: "aguas-abiertas-yojoa-2027",
    code: "FEH-2701-AYA",
    name: "Travesía de Aguas Abiertas Yojoa",
    description:
      "Primera fecha del circuito nacional de aguas abiertas con recorridos por categoría.",
    startDate: "2027-01-16",
    location: "Lago de Yojoa, Cortés",
    type: "competition",
    image: {
      src: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1200&h=800&fit=crop&auto=format",
      alt: "Nadadores avanzando juntos en una prueba de aguas abiertas",
    },
    sponsors: [sponsors.hidroLab, sponsors.cronoHn],
    disciplines: ["open_water"],
    participantCategories: [juvenil, abierta, master],
  },
  {
    id: "control-marcas-julio-2026",
    code: "FEH-2607-MAR",
    name: "Control Nacional de Marcas",
    description:
      "Jornada de evaluación de tiempos oficiales para clasificación y seguimiento técnico.",
    startDate: "2026-07-25",
    location: "Villa Olímpica, Tegucigalpa",
    type: "competition",
    sponsors: [sponsors.cronoHn],
    disciplines: ["swimming"],
    participantCategories: [juvenil, abierta],
    participantCount: 112,
  },
  {
    id: "nacional-clubes-junio-2026",
    code: "FEH-2606-CLB",
    name: "Campeonato Nacional por Clubes",
    description:
      "Competencia por equipos con programa completo de piscina corta y premiación acumulada.",
    startDate: "2026-06-13",
    endDate: "2026-06-14",
    location: "Complejo Olímpico Metropolitano, San Pedro Sula",
    type: "competition",
    image: {
      src: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=1200&h=800&fit=crop&auto=format",
      alt: "Nadador avanzando por un carril durante una competencia",
    },
    sponsors: [sponsors.aquaSport, sponsors.olaAzul],
    disciplines: ["swimming"],
    participantCategories: [infantil, juvenil, abierta, master],
    participantCount: 218,
  },
  {
    id: "clinica-clavados-mayo-2026",
    code: "FEH-2605-CLA",
    name: "Clínica Nacional de Clavados",
    description:
      "Práctica guiada de fundamentos, seguridad y progresiones técnicas para categorías formativas.",
    startDate: "2026-05-09",
    location: "Piscina Nacional, Tegucigalpa",
    type: "practice",
    image: {
      src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=1200&h=800&fit=crop&auto=format",
      alt: "Deportista practicando una disciplina acuática en una piscina",
    },
    sponsors: [],
    disciplines: ["diving"],
    participantCategories: [infantil, juvenil],
    participantCount: 34,
  },
  {
    id: "festival-artistica-marzo-2026",
    code: "FEH-2603-ART",
    name: "Festival de Natación Artística",
    description:
      "Presentación técnica y amistosa de rutinas individuales, dúos y equipos.",
    startDate: "2026-03-20",
    location: "Centro Acuático Municipal, La Ceiba",
    type: "friendly",
    sponsors: [sponsors.olaAzul],
    disciplines: ["artistic_swimming"],
    participantCategories: [infantil, juvenil, abierta],
    participantCount: 56,
  },
  {
    id: "cierre-waterpolo-2025",
    code: "FEH-2512-WP",
    name: "Cierre de Liga de Waterpolo",
    description:
      "Jornada final de la liga federada con partidos juveniles y de categoría abierta.",
    startDate: "2025-12-06",
    location: "Villa Olímpica, Tegucigalpa",
    type: "competition",
    image: {
      src: "https://images.unsplash.com/photo-1566938064504-a379175168b8?w=1200&h=800&fit=crop&auto=format",
      alt: "Jugadores disputando un encuentro de waterpolo",
    },
    sponsors: [sponsors.hidroLab],
    disciplines: ["water_polo"],
    participantCategories: [juvenil, abierta],
    participantCount: 64,
  },
];

