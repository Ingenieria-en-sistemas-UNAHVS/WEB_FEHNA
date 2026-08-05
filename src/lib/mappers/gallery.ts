import type { GalleryItem } from "@/features/gallery";
import type { MedioRow } from "@/lib/data/medios";
import { urlPublica } from "@/lib/data/medios";

/** Etiqueta legible del módulo al que pertenece cada imagen. */
const ETIQUETA_MODULO: Record<string, string> = {
  noticias: "Noticias",
  eventos: "Competencias",
  patrocinadores: "Patrocinadores",
  clubes: "Clubes",
  deportistas: "Atletas",
  documentos: "Documentos",
  resultados: "Resultados",
};

/**
 * Convierte los medios de Supabase Storage en tarjetas de la galería.
 * `nombresDeEvento` permite mostrar la competencia real cuando la imagen
 * está asociada a un evento.
 */
export function aGaleria(
  medios: MedioRow[],
  nombresDeEvento: Map<number, string> = new Map()
): GalleryItem[] {
  return medios.map((medio) => {
    const titulo = medio.titulo?.trim() || ETIQUETA_MODULO[medio.modulo] || "Galería FEHNA";
    const competencia =
      medio.modulo === "eventos" && medio.entidad_id !== null
        ? nombresDeEvento.get(medio.entidad_id) ?? ""
        : ETIQUETA_MODULO[medio.modulo] ?? "";

    return {
      id: String(medio.id),
      src: urlPublica(medio.bucket, medio.path),
      alt: medio.descripcion?.trim() || titulo,
      title: titulo,
      description: medio.descripcion?.trim() || "",
      date: medio.creado_en.slice(0, 10),
      author: "Archivo FEHNA",
      // La tabla `medios` solo distingue imagen y documento; el filtro de
      // video queda listo para cuando exista ese tipo.
      type: "photo",
      competitionName: competencia,
      tags: [medio.modulo],
    };
  });
}
