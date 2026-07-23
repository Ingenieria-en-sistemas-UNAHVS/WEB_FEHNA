// =====================================================================
// mediaConfig (FEHNA) — configuración central de cada módulo de medios.
// ---------------------------------------------------------------------
// Debe reflejar los límites definidos en los buckets de Supabase
// (mime types y tamaño). Si cambias un bucket, actualiza también aquí.
// =====================================================================
import type { Enums } from "@/lib/supabase";

export type Modulo = Enums<"modulo_medio">;
export type TipoMedio = Enums<"tipo_medio">;

export interface ModuloConfig {
  /** Bucket público donde se guardan los archivos públicos de este módulo. */
  bucket: string;
  tipo: TipoMedio;
  /** Tamaño máximo permitido en bytes (validación en cliente). */
  maxBytes: number;
  /** Mime types aceptados (validación en cliente). */
  accept: string[];
  /** Si el módulo normalmente admite varias imágenes/archivos. */
  multiplePorDefecto: boolean;
  label: string;
}

const MB = 1024 * 1024;

const IMAGENES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const IMAGENES_GIF = [...IMAGENES, "image/gif"];
const DOCS = [
  "application/pdf",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const MEDIA_CONFIG: Record<Modulo, ModuloConfig> = {
  noticias: {
    bucket: "noticias",
    tipo: "imagen",
    maxBytes: 5 * MB,
    accept: IMAGENES_GIF,
    multiplePorDefecto: true,
    label: "Imágenes de noticia",
  },
  eventos: {
    bucket: "eventos",
    tipo: "imagen",
    maxBytes: 5 * MB,
    accept: IMAGENES_GIF,
    multiplePorDefecto: true,
    label: "Galería del evento",
  },
  patrocinadores: {
    bucket: "patrocinadores",
    tipo: "imagen",
    maxBytes: 5 * MB,
    accept: IMAGENES,
    multiplePorDefecto: false,
    label: "Logo de patrocinador",
  },
  clubes: {
    bucket: "clubes",
    tipo: "imagen",
    maxBytes: 5 * MB,
    accept: IMAGENES,
    multiplePorDefecto: false,
    label: "Logo de club",
  },
  deportistas: {
    bucket: "deportistas",
    tipo: "imagen",
    maxBytes: 5 * MB,
    accept: IMAGENES,
    multiplePorDefecto: true,
    label: "Fotos del deportista",
  },
  documentos: {
    bucket: "documentos",
    tipo: "documento",
    maxBytes: 10 * MB,
    accept: [...IMAGENES, "application/pdf"],
    multiplePorDefecto: true,
    label: "Afiches / branding",
  },
  resultados: {
    bucket: "resultados",
    tipo: "documento",
    maxBytes: 15 * MB,
    accept: DOCS,
    multiplePorDefecto: true,
    label: "Archivos de resultados",
  },
};

/** Bucket usado cuando el usuario elige subir en modo privado. */
export const BUCKET_PRIVADO = "privado";

/** Extensión segura derivada del mime type (no confiamos en el nombre del archivo). */
export const EXT_POR_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "application/pdf": "pdf",
  "text/csv": "csv",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};
