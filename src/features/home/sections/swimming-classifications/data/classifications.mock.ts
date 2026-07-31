import type { SwimmingClassification } from "../types/classification.types";

// Mock temporal mientras no exista la tabla en Supabase.
// Orden oficial de los cuatro estilos (el mismo del combinado).
// Las fechas son la incorporación del estilo al programa olímpico.
export const CLASIFICACIONES_MOCK: SwimmingClassification[] = [
  {
    id: "mariposa",
    nombre: "Mariposa",
    descripcion:
      "Recuperación simultánea de ambos brazos sobre el agua y patada de delfín. Se separó del estilo pecho como estilo propio.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop&auto=format",
    desde: "1956",
  },
  {
    id: "dorso",
    nombre: "Dorso",
    descripcion:
      "Se nada en posición dorsal durante todo el recorrido, con salida desde dentro del agua sujeto al poyete.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format",
    desde: "1904",
  },
  {
    id: "pecho",
    nombre: "Pecho",
    descripcion:
      "Brazada y patada simétricas y simultáneas, con la cabeza rompiendo la superficie en cada ciclo. Es el estilo técnicamente más regulado.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800&h=600&fit=crop&auto=format",
    desde: "1908",
  },
  {
    id: "libre",
    nombre: "Libre",
    descripcion:
      "El nadador elige la técnica; en la práctica se nada crol por ser la más rápida. Es el estilo con más pruebas del calendario oficial.",
    imageUrl:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop&auto=format",
    desde: "1896",
  },
];
